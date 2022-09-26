const { body, validationResult } = require('express-validator')
const { Book, BookInstance, Genre, Author } = require('../models')
const { formateValidationErrors } = require('../utils')
const { getObjectOr404 } = require('../shortcuts')
const { ensureRequestPayloadItemIsArray } = require('../middlewares')

async function bookList(req, res) {
  const books = await Book.find()
    .select({ title: 1, author: 1 })
    .populate('author')
    .sort({ title: 1 })

  res.render('book_list', { title: 'Books List', books })
}

async function bookDetail(req, res) {
  let book
  try {
    book = await Book.findById(req.params.id).populate('author').populate('genre').orFail()
  } catch {
    const error = new Error('Book not found')
    error.status = 404
    throw error
  }
  const bookInstances = await BookInstance.where('book').equals(book)

  res.render('book_detail', { book, bookInstances, title: book.title })
}

async function bookCreateGet(req, res) {
  const [authors, genres] = await Promise.all([Author.find(), Genre.find()])

  res.render('book_form', {
    title: 'Create Book',
    authors,
    genres,
  })
}

const bookCreatePost = [
  ensureRequestPayloadItemIsArray({ itemName: 'genre' }), // Convert the genre to an array.
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async authorId => {
      try {
        await Author.findById(authorId).orFail()
      } catch {
        throw new Error(`invalid author`)
      }
    }),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  async (req, res) => {
    const errors = validationResult(req)

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    })

    if (errors.isEmpty()) {
      try {
        await book.save()
      } catch {
        const error = new Error()
        error.status = 400
        throw error
      }

      res.redirect(book.url)
      return
    }

    const [authors, genres] = await Promise.all([Author.find(), Genre.find()])

    genres
      .filter(genre => book.genre.includes(genre._id.toString()))
      // eslint-disable-next-line no-param-reassign
      .forEach(g => (g.checked = true))

    res.render('book_form', {
      title: 'Create Book',
      authors,
      genres,
      book,
      errors: formateValidationErrors(errors),
    })
  },
]

async function bookDeleteGet(req, res) {
  const book = await getObjectOr404(Book, req.params.id)
  res.render('book_delete', { title: 'Delete book', book })
}

async function bookDeletePost(req, res) {
  const book = await getObjectOr404(Book, req.params.id)
  await BookInstance.where('book').equals(book).deleteMany()
  await book.delete()
  res.redirect('/catalog/books')
}

async function bookUpdateGet(req, res) {
  const error404 = new Error('book not found')
  error404.status = 404

  const [book, authors, genres] = await Promise.all([
    Book.findById(req.params.id).orFail(error404),
    Author.find(),
    Genre.find(),
  ])

  book.genre.forEach(genreObjId => {
    const genre = genres.find(g => g._id.toString() === genreObjId.toString())
    if (genre) genre.checked = true
  })

  res.render('book_form', {
    title: 'Update Book',
    authors,
    genres,
    book,
  })
}

const bookUpdatePost = [
  ensureRequestPayloadItemIsArray({ itemName: 'genre' }), // Convert the genre to an array.
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async authorId => {
      try {
        await Author.findById(authorId).orFail()
      } catch {
        throw new Error(`invalid author`)
      }
    }),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),
  async (req, res) => {
    const errors = validationResult(req)

    const book = new Book({
      _id: req.params.id,
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    })

    if (errors.isEmpty()) {
      try {
        await Book.findByIdAndUpdate(req.params.id, book)
      } catch {
        const error = new Error()
        error.status = 400
        throw error
      }
      res.redirect(book.url)
      return
    }

    const [authors, genres] = await Promise.all([Author.find(), Genre.find()])

    genres
      .filter(genre => book.genre.includes(genre._id.toString()))
      // eslint-disable-next-line no-param-reassign
      .forEach(g => (g.checked = true))

    res.render('book_form', {
      title: 'Update Book',
      authors,
      genres,
      book,
      errors: formateValidationErrors(errors),
    })
  },
]

module.exports = {
  bookList,
  bookDetail,
  bookCreateGet,
  bookCreatePost,
  bookDeleteGet,
  bookDeletePost,
  bookUpdateGet,
  bookUpdatePost,
}
