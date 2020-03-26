var express = require('express');
var router = express.Router();
const Interests = require('../models/interests');
const passportMiddleware = require('../middlewares/passport');
const interestsCtrl = require('../controllers/interests');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    interestsCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    interestsCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    interestsCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    interestsCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    interestsCtrl.deleteById(req, res, next);
});





module.exports = router;