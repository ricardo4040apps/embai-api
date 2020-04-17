var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const TablaCtrl = require('../controllers/tabla-amortizacion');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    TablaCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    TablaCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    TablaCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    TablaCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    TablaCtrl.deleteById(req, res, next);
});

module.exports = router;