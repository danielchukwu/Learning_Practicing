const { MongoClient } = require('mongodb');

module.exports = {
   connectToDb: (cb) => {
      const url = 'mongodb://127.0.0.1:27017/bookstore';
      MongoClient.connect(url)
         .then((client) => {
            let dbConnection = client.db();
            cb();
         })
         .catch(err => {
            console.log("Error: Couldn't connect to db");
            cb(err);
         })
   },
   getDb: () => dbConnection
}