var express = require('express');
var router = express.Router();
const Company = require('../models/permission');
const passportMiddleware = require('../middlewares/passport');
const permissionCtrl = require('../controllers/permission');


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C R U D
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

router.get('/', passportMiddleware, function(req, res, next) {
  permissionCtrl.get(req, res, next);
});

router.get('/:id', passportMiddleware, function(req, res, next) {
  permissionCtrl.getById(req, res, next);
});


router.post('/', passportMiddleware, function(req, res, next) {
  permissionCtrl.create(req, res, next);
});


router.put('/:id', passportMiddleware, function(req, res, next) {
  permissionCtrl.update(req, res, next);
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
  permissionCtrl.deleteById(req, res, next);
});




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                C U S T O M S
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


module.exports = router;



