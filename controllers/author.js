function authorList(req, res) {
  res.send('author list')
}

function authorDetail(req, res) {
  res.send(`author detail ${req.params.id}`)
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
