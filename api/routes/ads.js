var express = require('express');
var router = express.Router();
const Ads = require('../models/ads');
const passportMiddleware = require('../middlewares/passport');
const adsCtrl = require('../controllers/ads');

/* GET ads listing. */
router.get('/validAds', function(req, res, next) {
    console.log('RUTAS')
    adsCtrl.isValidAds(req, res, next);
});


router.get('/', passportMiddleware, function(req, res, next) {
    adsCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    adsCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    adsCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    adsCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    adsCtrl.deleteById(req, res, next);
});





module.exports = router;