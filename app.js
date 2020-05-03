var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');




const config = require('./api/config/app');



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



//app.use(upload.array());
//app.use(express.static('public'));
//app.use('/files', express.static('files'));















/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                R O U T E R
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var indexRouter = require('./api/routes/index');

var adsRouter = require('./api/routes/ads');
var authRouter = require('./api/routes/auth');
var bankAccountsRouter = require('./api/routes/bank-accounts');
var bankInformationRouter = require('./api/routes/bank-information');
var banksRouter = require('./api/routes/banks');
var companiesRouter = require('./api/routes/companies');
var contactRouter = require('./api/routes/contact');
var corporationsRouter = require('./api/routes/corporations');
var creditInformationRouter = require('./api/routes/credit-information');
var documentationRouter = require('./api/routes/documentation');
var filesRouter = require('./api/routes/files');
var frequencyRouter = require('./api/routes/frequency');
var infoEmpRouter = require('./api/routes/informacion-empresarial');
var interestsRouter = require('./api/routes/interests');
var materialRouter = require('./api/routes/material');
var mailSenderRouter = require('./api/routes/mail-sender');
var microPrestRouter = require('./api/routes/micro-prestamo');
var microQuotationRouter = require('./api/routes/micro-quotation');
var noticeRouter = require('./api/routes/notice-privacy');
var notificationsRouter = require('./api/routes/notifications');
var paymentsRouter = require('./api/routes/payments');
var pawnObjectTypesRouter = require('./api/routes/pawn-object-types');
var pawnObjectPurityRouter = require('./api/routes/pawn-object-purity');
var permissionsRouter = require('./api/routes/permissions');
var phoneVerificationRouter = require('./api/routes/phone-verification');
var plansRouter = require('./api/routes/plans');
var presJoyRouter = require('./api/routes/prestamo-joyeria');
var preguntasRouter = require('./api/routes/preguntas-frecuentes');
var quotationRouter = require('./api/routes/quotation');
var replyRouter = require('./api/routes/reply');
var rolesRouter = require('./api/routes/roles');
var solicitudRouter = require('./api/routes/solicitud-prestamo');
var tablaRouter = require('./api/routes/tabla-amortizacion');
var termsRouter = require('./api/routes/terms-conditions');
var tiempoRouter = require('./api/routes/tiempo');
var usersRouter = require('./api/routes/users');
var valuationRouter = require('./api/routes/valuation');
var weightRouter = require('./api/routes/weights');



app.use('/', indexRouter);
app.use('/ads', adsRouter);
app.use('/auth', authRouter);
app.use('/bank', banksRouter);
app.use('/bank-accounts', bankAccountsRouter);
app.use('/bank-information', bankInformationRouter);
app.use('/credit-information', creditInformationRouter);
app.use('/companies', companiesRouter);
app.use('/contact', contactRouter);
app.use('/corporations', corporationsRouter);
app.use('/documentation', documentationRouter);
app.use('/files', filesRouter);
app.use('/frequency', frequencyRouter);
app.use('/informacion-empresarial', infoEmpRouter);
app.use('/interests', interestsRouter);
app.use('/mail-sender', mailSenderRouter)
app.use('/material', materialRouter)
app.use('/micro-prestamo', microPrestRouter);
app.use('/micro-quotation', microQuotationRouter);
app.use('/notice-privacy', noticeRouter);
app.use('/notifications', notificationsRouter);
app.use('/pawn-object-types', pawnObjectTypesRouter);
app.use('/pawn-object-purity', pawnObjectPurityRouter);
app.use('/payments', paymentsRouter);
app.use('/permissions', permissionsRouter);
app.use('/phone-verification', phoneVerificationRouter);
app.use('/plans', plansRouter);
app.use('/preguntas', preguntasRouter);
app.use('/prestamo-joyeria', presJoyRouter);
app.use('/quotation', quotationRouter);
app.use('/reply', replyRouter);
app.use('/roles', rolesRouter);
app.use('/solicitud', solicitudRouter);
app.use('/tabla-amortizacion', tablaRouter);
app.use('/terms-conditions', termsRouter);
app.use('/tiempo', tiempoRouter);
app.use('/users', usersRouter);
app.use('/valuation', valuationRouter);
app.use('/weight', weightRouter);


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                F I N  R O U T E R
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


module.exports = app;

/************** precent close terminal **************/
setInterval(function() { console.log("Tick! Tock!"); }, 60000)











/*EMAIL*/
const bodyParser = require('body-parser');
const massiveMail = require('./api/controllers/mail/massiveMail');
const configReply = require('./api/controllers/mail/configReply');


app.use(bodyParser.json());
app.use(cors());

app.post('/formulario', (req, res) => {
    massiveMail(req.body);
    res.status(200).send();
})

app.post('/formulario-respuesta', (req, res) => {
    configReply(req.body);
    res.status(200).send();
})

// app.listen(3000, () => {
//     console.log('Servidor corriendo')
// });