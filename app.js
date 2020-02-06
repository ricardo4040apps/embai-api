var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


// getting-started.js

const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./api/config/database');

var authRouter = require('./api/routes/auth');
var indexRouter = require('./api/routes/index');
var usersRouter = require('./api/routes/users');






console.log("Connecting to mongoDb ...")
mongoose.set('useCreateIndex', true);
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`)
});

mongoose.connection.on('error', (err) => {
    console.error(`Database error`, err)
});




var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./api/config/passport')(passport);





app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

module.exports = app;

