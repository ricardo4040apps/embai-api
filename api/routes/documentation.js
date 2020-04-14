var express = require('express');
var router = express.Router();
const Documentation = require('../models/documentation');
const passportMiddleware = require('../middlewares/passport');
const DocumentationCtrl = require('../controllers/documentation');

/* GET ads listing. */

router.get('/user/:id', function(req, res, next) { //Hasta arriba para no interferir
    DocumentationCtrl.getByIdUser(req, res, next);
});

router.get('/', passportMiddleware, function(req, res, next) {
    DocumentationCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    DocumentationCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    DocumentationCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    DocumentationCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    DocumentationCtrl.deleteById(req, res, next);
});





module.exports = router;