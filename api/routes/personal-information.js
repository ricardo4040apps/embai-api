var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const PersonalCtrl = require('../controllers/personal-information');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    PersonalCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    PersonalCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    PersonalCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    PersonalCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    PersonalCtrl.deleteById(req, res, next);
});