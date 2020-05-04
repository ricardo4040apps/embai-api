var express = require('express');
var router = express.Router();
const Solicitud = require('../models/solicitud-prestamo');
const passportMiddleware = require('../middlewares/passport');
const solicitudCtrl = require('../controllers/solicitud-prestamo');

/* GET users listing. */

router.get('/user/:id', function(req, res, next) { //Hasta arriba para no interferir
    solicitudCtrl.getByIdUser(req, res, next);
});


router.get('/', passportMiddleware, function(req, res, next) {
    solicitudCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    solicitudCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    solicitudCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    solicitudCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    solicitudCtrl.deleteById(req, res, next);
});





module.exports = router;