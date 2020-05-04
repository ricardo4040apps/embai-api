var express = require('express');
var router = express.Router();
const mailTesterCtrl = require('../controllers/mail-tester');


// only for test
router.post('/test/main', function(req, res, next) {
    mailTesterCtrl.sendMain(req, res, next);
});

router.post('/test/massive', function(req, res, next) {
    mailTesterCtrl.sendMasive(req, res, next);
});


module.exports = router;