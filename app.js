var express = require('express');
var exphbs = require('express-handlebars');
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
var contactRouter = require('./api/routes/contact');
var replyRouter = require('./api/routes/reply');
var interestsRouter = require('./api/routes/interests');
var bankAccountsRouter = require('./api/routes/bank-accounts');
var valuationRouter = require('./api/routes/valuation');
var bankInformationRouter = require('./api/routes/bank-information');
var creditInformationRouter = require('./api/routes/credit-information');
var termsRouter = require('./api/routes/terms-conditions');
var noticeRouter = require('./api/routes/notice-privacy');
var documentationRouter = require('./api/routes/documentation');
var quotationRouter = require('./api/routes/quotation');


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
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

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
app.use('/material', materialRouter)
app.use('/tiempo', tiempoRouter);
app.use('/plans', plansRouter);
app.use('/frequency', frequencyRouter);

app.use('/pawn-object-types', pawnObjectTypesRouter);
app.use('/pawn-object-purity', pawnObjectPurityRouter);
app.use('/weight', weightRouter);

app.use('/contact', contactRouter);
app.use('/reply', replyRouter);

app.use('/interests', interestsRouter);
app.use('/bank-accounts', bankAccountsRouter);

app.use('/valuation', valuationRouter);
app.use('/bank-information', bankInformationRouter);
app.use('/credit-information', creditInformationRouter);

app.use('/notice-privacy', noticeRouter);
app.use('/terms-conditions', termsRouter);
app.use('/documentation', documentationRouter);
app.use('/quotation', quotationRouter);


module.exports = app;

/************** precent close terminal **************/
setInterval(function() { console.log("Tick! Tock!"); }, 60000)




/*EMAIL*/
const bodyParser = require('body-parser');
const configMensaje = require('./api/controllers/configMensaje');
const configReply = require('./api/controllers/configReply');


app.use(bodyParser.json());
app.use(cors())

app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
})

app.post('/formulario-respuesta', (req, res) => {
    configReply(req.body);
    res.status(200).send();
})

// app.listen(3000, () => {
//     console.log('Servidor corriendo')
// });