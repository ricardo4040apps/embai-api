var express = require('express');
var router = express.Router();
const passport = require('passport')
const Company = require('../models/company');


/* GET users listing. */

router.get('/', function(req, res, next) {
    Company.getAll(req.query, (err, data) => {
      if (err) {
        console.error("route companies get:", err)
        return res.status(500).json('Failed to get company')
      }
      res.status(200).json(data)
    });

});

router.get('/:id', function(req, res, next) {
  Company.getById(req.params.id, (err, data) => {
    if (err) {
      console.error("route companies get:", err)
      return res.status(500).json('Failed to get company')
    }
    res.status(200).json(data)
  });
});


router.post('/', function(req, res, next) {
  let errors =  Company.hasErrors(req.body);
  console.log(errors)
  if (errors) return res.status(400).json(errors.message)

  Company.add(req.body, (err, data) => {
    if (err) {
      console.error("route companies post:", err)
      return res.status(500).json('Failed to register new company')
    }
    res.status(201).json(data)
    //res.status(201).json('User registered')
  });
});


router.put('/:id', function(req, res, next) {
  Company.update(req.params.id, req.body, (err, user) => {
    if (err) {
      console.error("route companies put:", err)
      return res.status(500).json('Failed to update company')
    }
    res.status(200).json(user)
  });
});


router.delete('/:id', function(req, res, next) {
  Company.deleteById(req.params.id, (err, data) => {
    if (err) {
      console.error("route companies delete:", err)
      return res.status(500).json('Failed to delete company')
    }
    res.status(204).json(data)
  });
});







// example protected wrong url
router.delete('/protected/example', passport.authenticate('jwt', { session: false }),  function(req, res, next) {
  res.status(200).send('Protected');
});



module.exports = router;



