const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
   title:    String,
   pages:   Number,
   rating:  Number,
   authorId: String
});

module.exports = mongoose.model('books', bookSchema);