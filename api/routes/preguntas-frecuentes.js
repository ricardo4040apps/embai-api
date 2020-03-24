var express = require('express');
var router = express.Router();
const Preguntas = require('../models/preguntas-frecuentes');
const passportMiddleware = require('../middlewares/passport');
const preguntasCtrl = require('../controllers/preguntas-frecuentes');

/* GET users listing. */

router.get('/favorites', function(req, res, next) {
    console.log('RUTAS')
    preguntasCtrl.isMainQuestion(req, res, next);
});
router.get('/', passportMiddleware, function(req, res, next) {
    preguntasCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    preguntasCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    preguntasCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    preguntasCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    preguntasCtrl.deleteById(req, res, next);
});


module.exports = router;