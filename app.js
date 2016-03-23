var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var flash    = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

require('./config/passport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({secret: 'my_app_secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var monk = require('monk');
var db = monk('localhost:2701/examdb');

var index = require('./controllers/index');
var students = require('./controllers/students');
var courses = require('./controllers/courses');
var faculties = require('./controllers/faculties');
var make_exam = require('./controllers/make_exam_controller');
var take_exam = require('./controllers/take_exam_controller');
var admin = require('./controllers/admin');
var login = require('./controllers/login_controller');

app.use('/',index);
app.use('/students', students);
app.use('/courses', courses);
app.use('/faculties', faculties);
app.use('/make_exam', make_exam);
app.use('/take_exam', take_exam);
app.use('/admin', admin);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
