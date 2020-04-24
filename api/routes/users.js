var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passportMiddleware = require('../middlewares/passport');
const userCtrl = require('../controllers/user');


router.post('/client', function(req, res, next) {
    userCtrl.createClient(req, res, next);
});

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    userCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    userCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
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
router.get('/searchUsers/:value', function(req, res, next) {
    userCtrl.searchUsers(req, res, next);
});




module.exports = router;