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
var preguntasRouter = require('./api/routes/preguntas-frecuentes');
var solicitudRouter = require('./api/routes/solicitud-prestamo');
var infoEmpRouter = require('./api/routes/informacion-empresarial');
var microPrestRouter = require('./api/routes/micro-prestamo');
var presJoyRouter = require('./api/routes/prestamo-joyeria');
var pawnObjectTypesRouter = require('./api/routes/pawn-object-types');
var pawnObjectPurityRouter = require('./api/routes/pawn-object-purity');
var weightRouter = require('./api/routes/weights');
var materialRouter = require('./api/routes/material');
var tiempoRouter = require('./api/routes/tiempo');
var frequencyRouter = require('./api/routes/frequency');
var plansRouter = require('./api/routes/plans');

var materialRouter = require('./api/routes/tiempo');
var contactRouter = require('./api/routes/contact');
var interestsRouter = require('./api/routes/interests');

var bankAccountsRouter = require('./api/routes/bank-accounts');







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
app.use('/preguntas', preguntasRouter);
app.use('/solicitud', solicitudRouter);
app.use('/informacion-empresarial', infoEmpRouter);
app.use('/micro-prestamo', microPrestRouter);
app.use('/micro-prestamo', microPrestRouter);
app.use('/prestamo-joyeria', presJoyRouter);

app.use('/prendas', prendasRouter);
app.use('/peso', pesoRouter);
app.use('/material', materialRouter)
app.use('/tiempo', tiempoRouter);
app.use('/plans', plansRouter);
app.use('/frequency', frequencyRouter);

app.use('/pawn-object-types', pawnObjectTypesRouter);
app.use('/pawn-object-purity', pawnObjectPurityRouter);
app.use('/weight', weightRouter);
app.use('/material', materialRouter);

app.use('/tiempo', materialRouter);
app.use('/contact', contactRouter);
app.use('/interests', interestsRouter);

app.use('/bank-accounts', bankAccountsRouter);


module.exports = app;




/************** precent close terminal **************/
setInterval(function() { console.log("Tick! Tock!"); }, 60000)