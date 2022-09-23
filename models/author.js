/* eslint-disable func-names */

const mongoose = require('mongoose')

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

const Author = mongoose.model('Author', AuthorSchema)

module.exports = Author
