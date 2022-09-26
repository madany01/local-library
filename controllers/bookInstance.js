const { body, validationResult, oneOf } = require('express-validator')
const { BookInstance, Book } = require('../models')
const { formateValidationErrors } = require('../utils')
const { getObjectOr404 } = require('../shortcuts')

async function bookInstanceList(req, res) {
  const bookInstances = await BookInstance.find().populate('book')

  res.render('book-instance_list', {
    title: 'Book Instance List',
    bookInstances,
  })
}

async function bookInstanceDetail(req, res) {
  let bookInstance
  try {
    bookInstance = await BookInstance.findById(req.params.id).populate('book').orFail()
  } catch {
    const error = new Error('Book Instance not found')
    error.status = 404
    throw error
  }

  res.render('book-instance_detail', {
    title: `Copy ${bookInstance.book.title}`,
    bookInstance,
  })
}

async function bookInstanceCreateGet(req, res) {
  const books = await Book.find()
  res.render('book-instance_form', {
    books,
    title: 'Create Book Instance',
  })
}

const bookInstanceCreatePost = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape().notEmpty().withMessage('status is required'),
  oneOf([
    body('dueBack', 'Invalid date').isEmpty().default(undefined),
    body('dueBack', 'Invalid date').notEmpty().toDate().isISO8601(),
  ]),

  async (req, res) => {
    const errors = validationResult(req)

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      dueBack: req.body.dueBack,
    })

    if (errors.isEmpty()) {
      await bookInstance.save()
      res.redirect(bookInstance.url)
      return
    }

    const books = await Book.find()

    res.render('book-instance_form', {
      title: 'Create Book Instance',
      bookInstance,
      errors: formateValidationErrors(errors),
      books,
    })
  },
]
async function bookInstanceDeleteGet(req, res) {
  const bookInstance = await getObjectOr404(BookInstance, req.params.id)
  await bookInstance.populate('book')
  res.render('book-instance_delete', { title: 'Delete Book Instance', bookInstance })
}

async function bookInstanceDeletePost(req, res) {
  const bookInstance = await getObjectOr404(BookInstance, req.params.id)
  await bookInstance.delete()
  res.redirect('/catalog/book-instances')
}

async function bookInstanceUpdateGet(req, res) {
  const bookInstance = await getObjectOr404(BookInstance, req.params.id)
  const books = await Book.find()

  res.render('book-instance_form', {
    bookInstance,
    title: 'Update Book Instance',
    books,
  })
}

const bookInstanceUpdatePost = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape().notEmpty().withMessage('status is required'),
  oneOf([
    body('dueBack', 'Invalid date').isEmpty().default(undefined),
    body('dueBack', 'Invalid date').notEmpty().toDate().isISO8601(),
  ]),

  async (req, res) => {
    const errors = validationResult(req)

    const bookInstance = new BookInstance({
      _id: req.params.id,
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      dueBack: req.body.dueBack,
    })

    if (errors.isEmpty()) {
      await BookInstance.findByIdAndUpdate(req.params.id, bookInstance)
      res.redirect(bookInstance.url)
      return
    }

    const books = await Book.find()

    res.render('book-instance_form', {
      title: 'Create Book Instance',
      bookInstance,
      errors: formateValidationErrors(errors),
      books,
    })
  },
]

module.exports = {
  bookInstanceList,
  bookInstanceDetail,
  bookInstanceCreateGet,
  bookInstanceCreatePost,
  bookInstanceDeleteGet,
  bookInstanceDeletePost,
  bookInstanceUpdateGet,
  bookInstanceUpdatePost,
}
