/* eslint-disable func-names */

const mongoose = require('mongoose')
const { DateTime } = require('luxon')

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

BookInstanceSchema.virtual('dueBackFormatted').get(function () {
  return DateTime.fromJSDate(this.dueBack).toLocaleString(DateTime.DATE_MED)
})

BookInstanceSchema.methods.dueBackToHTMLInput = function () {
  // yyyy-MM-dd
  const mm = String(this.dueBack.getMonth() + 1).padStart(2, 0)
  const dd = String(this.dueBack.getDate()).padStart(2, 0)
  const yyyy = this.dueBack.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

BookInstanceSchema.virtual('statusColor').get(function () {
  if (this.status === BOOK_STATUS.Available) return 'success'
  if (this.status === BOOK_STATUS.Maintenance) return 'danger'
  return 'warning'
})

BookInstanceSchema.virtual('available').get(function () {
  return this.status === BOOK_STATUS.Available
})

const BookInstance = mongoose.model('BookInstance', BookInstanceSchema)

module.exports = { BookInstance, BOOK_STATUS }
