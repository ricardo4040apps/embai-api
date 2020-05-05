var express = require('express');
var router = express.Router();
const mailTesterCtrl = require('../controllers/mail-tester');
const mailSenderCtrl = require('../controllers/mail-sender');


// only for test
router.post('/test/main', function(req, res, next) {
    mailTesterCtrl.sendMain(req, res, next);
});

// only for test
router.post('/test/masive', function(req, res, next) {
    mailTesterCtrl.sendMasive(req, res, next);
});


router.post('/massive', function(req, res, next) {
    mailSenderCtrl.sendMasive(req, res, next);
});


module.exports = router;