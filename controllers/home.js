const { Author, Book, BookInstance, Genre, BOOK_STATUS } = require('../models')

async function index(request, response) {
  const models = [Author, Book, BookInstance, Genre]
  const keys = [
    'authorsCnt',
    'booksCnt',
    'bookInstancesCnt',
    'genresCnt',
    'availableBookInstancesCnt',
  ]

  let data
  let error

  try {
    const counts = await Promise.all([
      ...models.map(Model => Model.countDocuments()),
      BookInstance.countDocuments({ status: BOOK_STATUS.Available }),
    ])

    data = Object.fromEntries(keys.map((key, idx) => [key, counts[idx]]))
  } catch (e) {
    error = e
  }

  response.render('index', {
    data,
    error,
    title: 'Home',
  })
}

module.exports = index
