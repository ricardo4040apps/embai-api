var express = require('express');
var router = express.Router();
const Prendas = require('../models/prendas');
const passportMiddleware = require('../middlewares/passport');
const prendasCtrl = require('../controllers/prendas');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    prendasCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    prendasCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    prendasCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    prendasCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    prendasCtrl.deleteById(req, res, next);
});





module.exports = router;