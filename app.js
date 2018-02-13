const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const index = require('./routes/index'),
    campgrounds = require('./routes/campgrounds'),
    campgroundspost = require('./routes/campgroundspost'),
    newcampground = require('./routes/newcampground');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/campgrounds', campgrounds);
app.use('/campgrounds', campgroundspost);
app.use('/campgrounds/new', newcampground);

global.campgrounds = [
    {name: "Salmon Creek", image: "images/salmoncreek.jpg"},
    {name: "Granite Hill", image: "images/granitehill.jpg"},
    {name: "Mountain Goat's Rest", image: "images/mountaingoatsrest.jpg"}
];

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;