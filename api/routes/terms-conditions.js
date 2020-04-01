var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const TermsCtrl = require('../controllers/terms-conditions');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    TermsCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    TermsCtrl.getById(req, res, next);
});

router.post('/', passportMiddleware, function(req, res, next) {
    TermsCtrl.create(req, res, next);
});

router.put('/:id', passportMiddleware, function(req, res, next) {
    TermsCtrl.update(req, res, next);
});

router.delete('/:id', passportMiddleware, function(req, res, next) {
    TermsCtrl.deleteById(req, res, next);
});

module.exports = router;