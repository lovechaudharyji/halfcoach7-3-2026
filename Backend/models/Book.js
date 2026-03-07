// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: String,
// pdf: {
//     data: Buffer,
//     contentType: String,
//     filename: String
//   },
//   image: {
//     data: Buffer,
//     contentType: String,
//     filename: String
//   }
// });

// module.exports = mongoose.model('Book', bookSchema);
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach", // 👈 This tells Mongoose how to populate
  },
  pdf: {
    data: Buffer,
    contentType: String,
    filename: String,
  },
  image: {
    data: Buffer,
    contentType: String,
    filename: String,
  },
});

module.exports = mongoose.model('Book', bookSchema);