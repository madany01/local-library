const path = require('path')

const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

// ____________________ database ____________________
mongoose
  .connect('mongodb://localhost:27017/local_library')
  .then(() => console.info('connection to mongodb established'))
  .catch(error => {
    console.error("couldn't connect to mongodb")
    throw error
  })

// ____________________ settings ____________________

app.set('views', path.join(__dirname, 'views')) // view engine setup
app.set('view engine', 'ejs')

// ____________________ middlewares ____________________

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// ____________________ routers ____________________

app.use('/', indexRouter)
app.use('/users', usersRouter)

// ____________________ error handling ____________________

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
// ________________________________________

module.exports = app
