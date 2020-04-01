var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const BankCtrl = require('../controllers/bank-information');

/* GET BANK INFORMATION listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    BankCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    BankCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    BankCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    BankCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    BankCtrl.deleteById(req, res, next);
});

module.exports = router;