var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const PlansCtrl = require('../controllers/plans');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    PlansCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    PlansCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    PlansCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    PlansCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    PlansCtrl.deleteById(req, res, next);
});





module.exports = router;