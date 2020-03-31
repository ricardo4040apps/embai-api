var express = require('express');
var router = express.Router();
const MicroPrest = require('../models/micro-prestamo');
const passportMiddleware = require('../middlewares/passport');
const microPrestCtrl = require('../controllers/micro-prestamo');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    microPrestCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    microPrestCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    microPrestCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    microPrestCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    microPrestCtrl.deleteById(req, res, next);
});


module.exports = router;