const express     = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema      = require('./schema_graphql/schema');
const mongoose    = require('mongoose');


// Initialize App & Middleware's
const app = express();

app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
mongoose.connection.once('open', () => {
   console.log("Connected to database")

   app.listen(4000, () => {
      console.log('Now listening for requests on port 4000');
   });
})