var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const pawnObjectTypesCtrl = require('../controllers/pawn-object-types');

/* GET users listing. */

router.get('/', function(req, res, next) {
    pawnObjectTypesCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectTypesCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    pawnObjectTypesCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectTypesCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectTypesCtrl.deleteById(req, res, next);
});





module.exports = router;