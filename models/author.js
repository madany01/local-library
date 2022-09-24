/* eslint-disable func-names */

const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const { Schema } = mongoose

const AuthorSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  birthDate: Date,
  deathDate: Date,
})

AuthorSchema.virtual('url').get(function () {
  return `/catalog/authors/${this._id}`
})

AuthorSchema.virtual('name').get(function () {
  return this.firstName && this.lastName ? `${this.lastName}, ${this.firstName}` : ''
})

AuthorSchema.virtual('birthDateFormatted').get(function () {
  return (
    this.birthDate && DateTime.fromJSDate(this.birthDate).toLocaleString(DateTime.DATE_MED)
  )
})

AuthorSchema.virtual('deathDateFormatted').get(function () {
  return this.deathDate
    ? DateTime.fromJSDate(this.deathDate).toLocaleString(DateTime.DATE_MED)
    : 'present'
})

const Author = mongoose.model('Author', AuthorSchema)

module.exports = Author
