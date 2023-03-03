const { MongoClient } = require('mongodb');


module.exports = {
   dbConnection: '',

   connectToDb: (cb) => {
      MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
      .then((client) => {
         dbConnection = client.db();
         console.log(cb);
         cb();
      })
      .catch(err => {
         console.log(err);
         cb(err);
      })
   },
   getDb: () => dbConnection
}