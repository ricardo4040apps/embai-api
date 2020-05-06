var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const PaymentsCtrl = require('../controllers/payments');

router.get('/user/:id', function(req, res, next) { //Hasta arriba para no interferir
    PaymentsCtrl.getByIdUser(req, res, next);
});
router.get('/', passportMiddleware, function(req, res, next) {
    PaymentsCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    PaymentsCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    PaymentsCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    PaymentsCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    PaymentsCtrl.deleteById(req, res, next);
});

module.exports = router;