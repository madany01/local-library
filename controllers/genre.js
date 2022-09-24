const { Genre, Book } = require('../models')

async function genreList(req, res) {
  const genres = await Genre.find().sort({ name: 1 })

  res.render('genre_list', {
    title: 'Genre List',
    genres,
  })
}

async function genreDetail(req, res, next) {
  let genre

  try {
    genre = await Genre.findById(req.params.id).orFail()
  } catch {
    const error = Error('Genre not found')
    error.status = 404
    throw error
  }

  const books = await Book.where({ genre: { $all: [genre] } })

  res.render('genre_detail', {
    genre,
    books,
    title: 'Genre Detail',
  })
}

function genreCreateGet(req, res) {
  res.send('genre create - get')
}

function genreCreatePost(req, res) {
  res.send('genre create - post')
}

function genreDeleteGet(req, res) {
  res.send('genre delete - get')
}

function genreDeletePost(req, res) {
  res.send('genre delete - post')
}

function genreUpdateGet(req, res) {
  res.send(`genre update ${req.params.id} - get`)
}

function genreUpdatePost(req, res) {
  res.send(`genre update ${req.params.id} - post`)
}

module.exports = {
  genreList,
  genreDetail,
  genreCreateGet,
  genreCreatePost,
  genreDeleteGet,
  genreDeletePost,
  genreUpdateGet,
  genreUpdatePost,
}
