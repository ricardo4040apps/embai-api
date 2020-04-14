var express = require('express');
var router = express.Router();
const PresJoy = require('../models/prestamo-joyeria');
const passportMiddleware = require('../middlewares/passport');
const presJoyCtrl = require('../controllers/prestamo-joyeria');

/* GET users listing. */


router.get('/user/:id', function(req, res, next) { //Hasta arriba para no interferir
    presJoyCtrl.getByIdUser(req, res, next);
});

router.get('/', passportMiddleware, function(req, res, next) {
    presJoyCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    presJoyCtrl.getById(req, res, next);
});

router.post('/', passportMiddleware, function(req, res, next) {
    presJoyCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    presJoyCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    presJoyCtrl.deleteById(req, res, next);
});


module.exports = router;