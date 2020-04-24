var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const bankCtrl = require('../controllers/bank');

/* GET users listing. */

router.get('/', function(req, res, next) {
    bankCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    bankCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    bankCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    bankCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    bankCtrl.deleteById(req, res, next);
});





module.exports = router;