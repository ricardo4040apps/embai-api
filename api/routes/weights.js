var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const weightCtrl = require('../controllers/weight');

/* GET PESO. */

router.get('/', passportMiddleware, function(req, res, next) {
    weightCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    weightCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    weightCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    weightCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    weightCtrl.deleteById(req, res, next);
});





module.exports = router;