var express = require('express');
var router = express.Router();
const Material = require('../models/material');
const passportMiddleware = require('../middlewares/passport');
const MaterialCtrl = require('../controllers/material');

/* GET users listing. */

router.get('/', function(req, res, next) {
    MaterialCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    MaterialCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    MaterialCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    MaterialCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    MaterialCtrl.deleteById(req, res, next);
});

module.exports = router;