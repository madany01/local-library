function bookInstanceList(req, res) {
  res.send('bookInstance list')
}

function bookInstanceDetail(req, res) {
  res.send(`bookInstance detail ${req.params.id}`)
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
