function genreList(req, res) {
  res.send('genre list')
}

function genreDetail(req, res) {
  res.send(`genre detail ${req.params.id}`)
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
