var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression')
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compression())  // compress all responses
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var index = require('./routes/index')(app)
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Connecting to database
// -----------------------
if (app.get('env') == 'development') {
  console.log("Development Env...")
  mongoose.connect("mongodb://172.16.1.50:27017/practice", { useNewUrlParser: true }, (err) => {
    if (err) console.log("Error connecting mongodb....")
    else console.log("Connected to Mongodb")
  })
}

app.listen(4000, function () {
  console.log('App is listning on port 4000')
});

module.exports = app;
