/* eslint-disable func-names */

const mongoose = require('mongoose')

const { Schema } = mongoose

const BookSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  title: { type: String, required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
})

BookSchema.virtual('url').get(function () {
  return `/catalog/books/${this._id}`
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book
