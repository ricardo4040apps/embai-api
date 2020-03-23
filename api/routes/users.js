var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passportMiddleware = require('../middlewares/passport');
const userCtrl = require('../controllers/user');


/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    userCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    userCtrl.getById(req, res, next);
});


router.post('/', function(req, res, next) {
    userCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    userCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    userCtrl.deleteById(req, res, next);
});


router.get('/is-email-bussy/:value', function(req, res, next) {
    userCtrl.isEmailBussy(req, res, next);
});

router.get('/is-cellphone-bussy/:value', function(req, res, next) {
    userCtrl.isCellPhoneBussy(req, res, next);
});

router.get('/is-username-bussy/:value', function(req, res, next) {
    userCtrl.isUsernameBussy(req, res, next);
});




module.exports = router;