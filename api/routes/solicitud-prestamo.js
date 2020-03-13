var express = require('express');
var router = express.Router();
const Company = require('../models/company');
const passportMiddleware = require('../middlewares/passport');
const companyCtrl = require('../controllers/company');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    companyCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    companyCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    companyCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    companyCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    companyCtrl.deleteById(req, res, next);
});





module.exports = router;