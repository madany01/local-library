const { BookInstance } = require('../models')

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

function bookInstanceCreateGet(req, res) {
  res.send('bookInstance create - get')
}

function bookInstanceCreatePost(req, res) {
  res.send('bookInstance create - post')
}

function bookInstanceDeleteGet(req, res) {
  res.send('bookInstance delete - get')
}

function bookInstanceDeletePost(req, res) {
  res.send('bookInstance delete - post')
}

function bookInstanceUpdateGet(req, res) {
  res.send(`bookInstance update ${req.params.id} - get`)
}

function bookInstanceUpdatePost(req, res) {
  res.send(`bookInstance update ${req.params.id} - post`)
}

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
