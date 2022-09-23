function bookList(req, res) {
  res.send('book list')
}

function bookDetail(req, res) {
  res.send(`book detail ${req.params.id}`)
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
