const { 
   GraphQLObjectType, 
   GraphQLString, 
   GraphQLID, 
   GraphQLSchema,
   GraphQLInt,
   GraphQLList,
   GraphQLNonNull
} = require('graphql');
const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/book');

// dummy data
var books = [
   {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
   {name: 'Name of the Wind', genre: 'Fantasy', id: '2', authorId: '2'},
   {name: 'Name of the Wind', genre: 'Fantasy', id: '3', authorId: '3'},
];

var authors = [
   {name: 'Patrick Rothfuss',  age: 44, id: '1'},
   {name: 'Brandon Sanders2n', age: 44, id: '2'},
   {name: 'Terry Pratchett',   age: 66, id: '3'},
];

// Types
const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id:       {type: GraphQLID },
      title:    {type: GraphQLString},
      pages:    {type: GraphQLInt},
      rating:   {type: GraphQLInt},
      authorId: {type: GraphQLID},
      author: {
         type: AuthorType,
         resolve(parent, args) {
            // return _.find(authors, {id: parent.authorId});
            return Author.findById(parent.authorId);
         }
      }
   })
});

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
      id:   {type: GraphQLID},
      name: {type: GraphQLString},
      age:  {type: GraphQLInt},
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            return Book.find({authorId: parent.id});
         }
      }
   })
});

// Query Root
const RootType = new GraphQLObjectType({
   name: 'RootType',
   fields: {
      book: {
         type: BookType,
         args: {id: {type: GraphQLID}},
         resolve(parent, args){
            return Book.findById(args.id);
         }
      },
      author: {
         type: AuthorType,
         args: {id: {type: GraphQLID}},
         resolve(parent, args){
            return Author.findById(args.id);
         }
      },
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            return Book.find({});
         }
      },
      authors: {
         type: new GraphQLList(AuthorType),
         resolve(parent, args) {
            return Author.find({});
         }
      }
   }
});

// Mutation
const Mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: {
      addAuthor: {
         type: AuthorType,
         args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            age:  {type: new GraphQLNonNull(GraphQLInt)}
         },
         resolve(parent, args){
            const author = new Author({
               name: args.name,
               age:  args.age
            });
            return author.save();
         }
      },
      addBook: {
         type: BookType,
         args: {
            title:    {type: new GraphQLNonNull(GraphQLString)},
            pages:    {type: new GraphQLNonNull(GraphQLInt)},
            rating:   {type: new GraphQLNonNull(GraphQLInt)},
            authorId: {type: new GraphQLNonNull(GraphQLID) }
         },
         resolve(parent, args){
            const book = new Book({
               title: args.title,
               pages: args.pages,
               rating: args.rating,
               authorId: args.authorId
            });
            return book.save()
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootType,
   mutation: Mutation
});