var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const pawnObjectPurityCtrl = require('../controllers/pawn-object-purity');

/* GET PESO. */

router.get('/', passportMiddleware, function(req, res, next) {
    pawnObjectPurityCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectPurityCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    pawnObjectPurityCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectPurityCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    pawnObjectPurityCtrl.deleteById(req, res, next);
});





module.exports = router;