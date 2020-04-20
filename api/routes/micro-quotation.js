var express = require('express');
var router = express.Router();
// const Quotation = require('../models/quotation');
const passportMiddleware = require('../middlewares/passport');
const microQuotationCtrl = require('../controllers/micro-quotation');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    microQuotationCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    microQuotationCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    microQuotationCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    microQuotationCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    microQuotationCtrl.deleteById(req, res, next);
});


module.exports = router;