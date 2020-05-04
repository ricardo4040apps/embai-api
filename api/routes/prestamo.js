var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const prestamoCtrl = require('../controllers/prestamo');

/* GET users listing. */


router.get('/user/:id', function(req, res, next) { //Hasta arriba para no interferir
    prestamoCtrl.getByIdUser(req, res, next);
});

router.get('/', passportMiddleware, function(req, res, next) {
    prestamoCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    prestamoCtrl.getById(req, res, next);
});

router.post('/', passportMiddleware, function(req, res, next) {
    prestamoCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    prestamoCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    prestamoCtrl.deleteById(req, res, next);
});


module.exports = router;