var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');



const config = require('./api/config/app');

var indexRouter = require('./api/routes/index');
var authRouter = require('./api/routes/auth');
var companiesRouter = require('./api/routes/companies');
var corporationsRouter = require('./api/routes/corporations');
var notificationsRouter = require('./api/routes/notifications');
var permissionsRouter = require('./api/routes/permissions');
var rolesRouter = require('./api/routes/roles');
var usersRouter = require('./api/routes/users');
var filesRouter = require('./api/routes/files');
var adsRouter = require('./api/routes/ads');
var infoEmpRouter = require('./api/routes/informacion-empresarial');
var microPrestRouter = require('./api/routes/micro-prestamo');
var presJoyRouter = require('./api/routes/prestamo-joyeria');






console.log("Connecting to mongoDb ...")
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE || config.database.database, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on('connected', () => {
    console.log(`Connected to mongo database!!!`)
        //console.log(`Connected to mongo database ${config.database.database}`)
});

mongoose.connection.on('error', (err) => {
    console.error(`Database error`, err.message)
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

/////require('./api/middlewares/passport')(passport);

//app.use(upload.array());
//app.use(express.static('public'));
//app.use('/files', express.static('files'));


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/companies', companiesRouter);
app.use('/corporations', corporationsRouter);
app.use('/notifications', notificationsRouter);
app.use('/permissions', permissionsRouter);
app.use('/roles', rolesRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);
app.use('/ads', adsRouter);
app.use('/informacion-empresarial', infoEmpRouter);
app.use('/micro-prestamo', microPrestRouter);
app.use('/micro-prestamo', microPrestRouter);
app.use('/prestamo-joyeria', presJoyRouter);





module.exports = app;



/************** precent close terminal **************/
setInterval(function() { console.log("Tick! Tock!"); }, 60000)