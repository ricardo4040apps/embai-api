var express = require('express');
var router = express.Router();
const InfoEmp = require('../models/informacion-empresarial');
const passportMiddleware = require('../middlewares/passport');
const infoEmpCtrl = require('../controllers/informacion-empresarial');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    infoEmpCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    infoEmpCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    infoEmpCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    infoEmpCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    infoEmpCtrl.deleteById(req, res, next);
});





module.exports = router;