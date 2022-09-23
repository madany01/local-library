/* eslint-disable func-names */

const mongoose = require('mongoose')

const { Schema } = mongoose

const BOOK_STATUS = Object.freeze({
  Available: 'Available',
  Reserved: 'Reserved',
  Loaned: 'Loaned',
  Maintenance: 'Maintenance',
})

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: Object.values(BOOK_STATUS),
    default: 'Maintenance',
  },
  dueBack: { type: Date, default: Date.now },
})

BookInstanceSchema.virtual('url').get(function () {
  return `/catalog/book-instances/${this._id}`
})

const BookInstance = mongoose.model('BookInstance', BookInstanceSchema)

module.exports = { BookInstance, BOOK_STATUS }
