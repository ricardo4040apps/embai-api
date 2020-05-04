var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const AccountsCtrl = require('../controllers/bank-accounts');

/* GET users listing. */

router.get('/user/:id', function(req, res, next) { //Hasta arriba para no interferir
    AccountsCtrl.getByIdUser(req, res, next);
});

// router.get("/infoUser", passportMiddleware, function(req, res, next) {
// });

router.get('/', passportMiddleware, function(req, res, next) {
    AccountsCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    AccountsCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    AccountsCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    AccountsCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    AccountsCtrl.deleteById(req, res, next);
});

module.exports = router;