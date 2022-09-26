const { body, validationResult } = require('express-validator')
const { Genre, Book } = require('../models')
const { getObjectOr404 } = require('../shortcuts')
const { formateValidationErrors } = require('../utils')

async function genreList(req, res) {
  const genres = await Genre.find().sort({ name: 1 })

  res.render('genre_list', {
    title: 'Genre List',
    genres,
  })
}

async function genreDetail(req, res, next) {
  const genre = await getObjectOr404(Genre, req.params.id)

  const books = await Book.where({ genre: { $all: [genre] } })

  res.render('genre_detail', {
    genre,
    books,
    title: 'Genre Detail',
  })
}

function genreCreateGet(req, res) {
  res.render('genre_form', {
    title: 'Create Genre',
  })
}

const genreCreatePost = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('genre name is required')
    .toLowerCase()
    .escape(),

  async (req, res) => {
    const genre = new Genre({ name: req.body.name })
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre,
        errors: formateValidationErrors(errors),
      })
      return
    }

    const foundGenre = await Genre.findOne({ name: req.body.name })

    if (foundGenre) {
      res.redirect(foundGenre.url)
      return
    }

    await genre.save()
    res.redirect(genre.url)
  },
]

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
