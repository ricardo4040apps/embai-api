var express = require('express');
var router = express.Router();
const Contact = require('../models/contact');
const passportMiddleware = require('../middlewares/passport');
const contactCtrl = require('../controllers/contact');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    contactCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    contactCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    contactCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    contactCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    contactCtrl.deleteById(req, res, next);
});





module.exports = router;