'use strict';


/**
 * Get Dependecies
 */
var express         = require('express'),
    path            = require('path'),
    favicon         = require('static-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose');


/**
 * Load Storage
 */
mongoose.connect('mongodb://127.0.0.1/equestionnaire');


/**
 * Load app
 */
var app = express();

/* Set engine */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* Set middleware */

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'ri6zml7dom-#y7+5o#-@ioa9(bp)b($(!$)wffs^inuhy8kk1f', key: 'sid'})); //, cookie: { secure: true }
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.set({ 'X-Powered-By': 'eQuestionnaire'});
    next();
});

/* Set routes */

var routes = require('./routes/__main__');
routes(app);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
