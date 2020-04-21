var express = require('express');
var router = express.Router();
// const Quotation = require('../models/quotation');
const passportMiddleware = require('../middlewares/passport');
const quotationCtrl = require('../controllers/quotation');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    quotationCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    quotationCtrl.getById(req, res, next);
});


router.post('/', function(req, res, next) {
    quotationCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    quotationCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    quotationCtrl.deleteById(req, res, next);
});


module.exports = router;