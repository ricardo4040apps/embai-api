var express = require('express');
var router = express.Router();
const Reply = require('../models/reply');
const passportMiddleware = require('../middlewares/passport');
const replyCtrl = require('../controllers/reply');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    replyCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    replyCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    replyCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    replyCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    replyCtrl.deleteById(req, res, next);
});





module.exports = router;