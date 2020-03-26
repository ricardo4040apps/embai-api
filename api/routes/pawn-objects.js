var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const pawnObjectsCtrl = require('../controllers/pawn-objects');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    pawnObjectsCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectsCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    pawnObjectsCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectsCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectsCtrl.deleteById(req, res, next);
});





module.exports = router;