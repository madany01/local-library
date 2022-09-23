const express = require('express')

const {
  homeController,
  bookController,
  authorController,
  bookInstanceController,
  genreController,
} = require('../controllers')

const router = express.Router()

// ____________________ index ____________________

router.get('/', homeController)

// ____________________ book ____________________

router.get('/books', bookController.bookList)

router
  .route('/books/create')
  .get(bookController.bookCreateGet)
  .post(bookController.bookCreatePost)

router.get('/books/:id', bookController.bookDetail)

router
  .route('/books/:id/update')
  .get(bookController.bookUpdateGet)
  .post(bookController.bookUpdatePost)

router
  .route('/books/:id/delete')
  .get(bookController.bookDeleteGet)
  .post(bookController.bookDeletePost)

// ____________________ author ____________________

router.get('/authors', authorController.authorList)

router
  .route('/authors/create')
  .get(authorController.authorCreateGet)
  .post(authorController.authorCreatePost)

router.get('/authors/:id', authorController.authorDetail)

router
  .route('/authors/:id/update')
  .get(authorController.authorUpdateGet)
  .post(authorController.authorUpdatePost)

router
  .route('/authors/:id/delete')
  .get(authorController.authorDeleteGet)
  .post(authorController.authorDeletePost)

// ____________________ genre ____________________

router.get('/genres', genreController.genreList)

router
  .route('/genres/create')
  .get(genreController.genreCreateGet)
  .post(genreController.genreCreatePost)

router.get('/genres/:id', genreController.genreDetail)

router
  .route('/genres/:id/update')
  .get(genreController.genreUpdateGet)
  .post(genreController.genreUpdatePost)

router
  .route('/genres/:id/delete')
  .get(genreController.genreDeleteGet)
  .post(genreController.genreDeletePost)

// ____________________ bookInstance ____________________

router.get('/book-instances', bookInstanceController.bookInstanceList)

router
  .route('/book-instances/create')
  .get(bookInstanceController.bookInstanceCreateGet)
  .post(bookInstanceController.bookInstanceCreatePost)

router.get('/book-instances/:id', bookInstanceController.bookInstanceDetail)

router
  .route('/book-instances/:id/update')
  .get(bookInstanceController.bookInstanceUpdateGet)
  .post(bookInstanceController.bookInstanceUpdatePost)

router
  .route('/book-instances/:id/delete')
  .get(bookInstanceController.bookInstanceDeleteGet)
  .post(bookInstanceController.bookInstanceDeletePost)

module.exports = router
