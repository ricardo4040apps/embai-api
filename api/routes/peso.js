var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const pesoCtrl = require('../controllers/peso');

/* GET PESO. */

router.get('/', passportMiddleware, function(req, res, next) {
    pesoCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    pesoCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    pesoCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    pesoCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    pesoCtrl.deleteById(req, res, next);
});





module.exports = router;