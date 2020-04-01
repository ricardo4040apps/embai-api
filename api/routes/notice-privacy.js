var express = require('express');
var router = express.Router();
const passportMiddleware = require('../middlewares/passport');
const NoticeCtrl = require('../controllers/notice-privacy');

/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    NoticeCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    NoticeCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
    NoticeCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    NoticeCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    NoticeCtrl.deleteById(req, res, next);
});

module.exports = router;