const { Author, Book } = require('../models')

async function authorList(req, res) {
  const authors = await Author.find().sort({ lastName: 1, firstName: 1 })
  res.render('author_list', { authors, title: 'Authors List' })
}

async function authorDetail(req, res) {
  let author

  try {
    author = await Author.findById(req.params.id).orFail()
  } catch {
    const error = new Error('Author not found')
    error.status = 404
    throw error
  }
  const books = await Book.where('author').equals(author).select('title summary')
  res.render('author_detail', { books, author, title: 'Author Detail' })
}

function authorCreateGet(req, res) {
  res.send('author create - get')
}

function authorCreatePost(req, res) {
  res.send('author create - post')
}

function authorDeleteGet(req, res) {
  res.send('author delete - get')
}

function authorDeletePost(req, res) {
  res.send('author delete - post')
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
