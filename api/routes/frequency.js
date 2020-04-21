var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const FrequencyCtrl = require('../controllers/frequency');

/* GET frequency listing. */

router.get('/', function(req, res, next) {
    FrequencyCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    FrequencyCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    FrequencyCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    FrequencyCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    FrequencyCtrl.deleteById(req, res, next);
});

module.exports = router;