const express = require('express');
const {connectToDb, getDb} = require('./db');
const { ObjectId } = require('mongodb');

// Initialize app & Middleware
const app = express();
app.use(express.json());
let db;


connectToDb((err) => {
   if (!err){
      console.log("Connection: Successful!")
      app.listen(4000, () => {
         console.log('Listening on port 4000')
      })
      db = getDb();
   } else {
      console.log(err)
   }
})


// routes
app.get('/', (req, res) => {
   res.status(200).json({mssg: 'Welcome to our Node API.'});
});

// get
app.get('/books', (req, res) => {
   let books = [];

   const page = req.query.p || 0;
   const BOOKS_PER_PAGE = 3;
   
   db.collection('books')
      .find()
      .skip(BOOKS_PER_PAGE * page)
      .limit(BOOKS_PER_PAGE)
      .forEach(book => books.push(book))
      .then(() => {
         return res.status(200).json({data: books});
      })
      .catch((err) => {
         console.log(err.message);
         return res.status(500).json({error: "couldn't fetch"});
      })
      
})

app.get('/books/:id', (req, res) => {
   const id = req.params.id;

   if (ObjectId.isValid(id)) {
      db.collection('books')
         .findOne({_id: new ObjectId(id)})
         .then(doc => {
            return res.status(200).json({doc});
         })
         .catch(err => {
            console.log(err);
            return res.status(500).json({error: "couldn't fetch the document"});
         })
   }
   else {
      return res.status(500).json({error: 'Not a valid doc id'});
   }
})

// post   request
app.post('/books', (req, res) => {
   const body = req.body;

   db.collection('books')
      .insertOne(body)
      .then(result => {
         return res.status(200).json(result);
      })
      .catch(err => {
         return res.status(500).json({msg: 'Couldn\'t insert document'});
      })
})

// remove requests
app.delete('/books/:id', (req, res) => {
   const id = req.params.id;

   if (ObjectId.isValid(id)) {
      db.collection('books')
         .deleteOne({_id: new ObjectId(id)})
         .then(result => {
            return res.status(200).json(result);
         })
         .catch(err => {
            console.log(err);
            return res.status(500).json({error: "couldn't delete the document"});
         })
   }
   else {
      return res.status(500).json({error: 'Not a valid doc id'});
   }
})

// patch  requests
app.patch('/books/:id', (req, res) => {
   const id = req.params.id;
   const body = req.body;

   if (ObjectId.isValid(id)) {
      db.collection('books')
         .updateOne({_id: new ObjectId(id)}, {$set: body})
         .then(result => {
            return res.status(200).json(result);
         })
         .catch(err => {
            console.log(err);
            return res.status(500).json({error: "couldn't update the document"});
         })
   }
   else {
      return res.status(500).json({error: 'Not a valid doc id'});
   }
})