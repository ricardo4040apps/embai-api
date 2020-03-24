var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const tiempoCtrl = require('../controllers/tiempo');

/* GET TIEMPO. */

router.get('/', passportMiddleware, function(req, res, next) {
    tiempoCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    tiempoCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    tiempoCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    tiempoCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    tiempoCtrl.deleteById(req, res, next);
});





module.exports = router;