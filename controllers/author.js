const { body, validationResult } = require('express-validator')
const { Author, Book } = require('../models')
const { formateValidationErrors } = require('../utils')
const { getObjectOr404 } = require('../shortcuts')

async function authorList(req, res) {
  const authors = await Author.find().sort({ lastName: 1, firstName: 1 })
  res.render('author_list', { authors, title: 'Authors List' })
}

async function authorDetail(req, res) {
  const author = await getObjectOr404(Author, req.params.id)
  const books = await Book.where('author').equals(author).select('title summary')
  res.render('author_detail', { books, author, title: 'Author Detail' })
}

function authorCreateGet(req, res) {
  res.render('author_form', { title: 'Create Author' })
}

const authorCreatePost = [
  body('firstName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('first name is required')
    .isAlphanumeric()
    .withMessage('first name must be alphanumeric'),
  body('lastName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('last name is required')
    .isAlphanumeric()
    .withMessage('last name must be alphanumeric'),
  body('birthDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage('invalid birth date'),
  body('deathDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage('invalid death date'),
  async (req, res) => {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      deathDate: req.body.deathDate,
    })

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      await author.save()
      res.redirect(author.url)
      return
    }

    res.render('author_form', {
      errors: formateValidationErrors(errors),
      title: 'Create Author',
      author,
    })
  },
]

async function authorDeleteGet(req, res) {
  const author = await getObjectOr404(Author, req.params.id)
  const authorBooks = await Book.find({ author: req.params.id })

  res.render('author_delete', {
    title: 'Delete Author',
    author,
    authorBooks,
  })
}

async function authorDeletePost(req, res) {
  const author = await getObjectOr404(Author, req.params.id)
  const authorBooks = await Book.where('author').equals(author)

  if (authorBooks.length === 0) {
    // Author has no books. Delete object and redirect to the list of authors.
    await author.delete()
    res.redirect('/catalog/authors')
    return
  }

  res.render('author_delete', {
    title: 'Delete Author',
    author,
    authorBooks,
  })
}

function authorUpdateGet(req, res) {
  res.send(`author update ${req.params.id} - get`)
}

function authorUpdatePost(req, res) {
  res.send(`author update ${req.params.id} - post`)
}

module.exports = {
  authorList,
  authorDetail,
  authorCreateGet,
  authorCreatePost,
  authorDeleteGet,
  authorDeletePost,
  authorUpdateGet,
  authorUpdatePost,
}
