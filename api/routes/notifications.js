var express = require('express');
var router = express.Router();
const Notification = require('../models/notification');
const passportMiddleware = require('../middlewares/passport');
const notificationCtrl = require('../controllers/notification');


/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
  notificationCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
  notificationCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
  notificationCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
  notificationCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
  notificationCtrl.deleteById(req, res, next);
});

module.exports = router;



