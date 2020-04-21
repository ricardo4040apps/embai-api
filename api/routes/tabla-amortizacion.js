var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const TablaCtrl = require('../controllers/tabla-amortizacion');

/* GET users listing. */

router.get('/', function(req, res, next) {
    TablaCtrl.get(req, res, next);
});

module.exports = router;