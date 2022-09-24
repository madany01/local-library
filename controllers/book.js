const { Book, BookInstance } = require('../models')

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
    book = await Book.findById(req.params.id).populate('author').populate('genre')
  } catch {
    const error = new Error('Book not found')
    throw error
  }
  const bookInstances = await BookInstance.find({ book })

  res.render('book_detail', { book, bookInstances, title: book.title })
}

function bookCreateGet(req, res) {
  res.send('book create - get')
}

function bookCreatePost(req, res) {
  res.send('book create - post')
}

function bookDeleteGet(req, res) {
  res.send('book delete - get')
}

function bookDeletePost(req, res) {
  res.send('book delete - post')
}

function bookUpdateGet(req, res) {
  res.send(`book update ${req.params.id} - get`)
}

function bookUpdatePost(req, res) {
  res.send(`book update ${req.params.id} - post`)
}

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
