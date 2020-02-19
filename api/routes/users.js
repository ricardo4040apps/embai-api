var express = require('express');
var router = express.Router();
const passport = require('passport')
const User = require('../models/user');


/* GET users listing. */

router.get('/', function(req, res, next) {
    User.getAll(req.query, (err, data) => {
      if (err) {
        console.error("route users get:", err)
        return res.status(500).json('Failed to get users')
      }
      res.status(200).json(data)
    });

});

router.get('/:id', function(req, res, next) {
  User.getById(req.params.id, (err, data) => {
    if (err) {
      console.error("route users get:", err)
      return res.status(500).json('Failed to get user')
    }
    res.status(200).json(data)
  });
});


router.post('/', function(req, res, next) {
  let errors =  User.hasErrors(req.body);
  console.log(errors)
  if (errors) return res.status(400).json(errors.message)

  User.add(req.body, (err, data) => {
    if (err) {
      console.error("route users post:", err)
      return res.status(500).json('Failed to register new User')
    }
    res.status(201).json(data)
    //res.status(201).json('User registered')
  });
});


router.put('/:id', function(req, res, next) {
  User.update(req.params.id, req.body, (err, data) => {
    if (err) {
      console.error("route users put:", err)
      return res.status(500).json('Failed to update User')
    }
    res.status(200).json(data)
  });
});


router.delete('/:id', function(req, res, next) {
  User.deleteById(req.params.id, (err, data) => {
    if (err) {
      console.error("route users delete:", err)
      return res.status(500).json('Failed to delete user')
    }
    res.status(204).json(data)
  });
});


router.get('/is-email-bussy/:value', function(req, res, next) {
  let query =  {email: req.params.value}
  User.getAll(query, (err, data) => {
    if (err) {
      console.error("route users get:", err)
      return res.status(500).json('Failed to get users')
    }
    res.status(200).json(data.length > 0)
  });
});

router.get('/is-cellphone-bussy/:value', function(req, res, next) {
  let query =  {cellPhone: req.params.value}
  User.getAll(query, (err, data) => {
    if (err) {
      console.error("route users get:", err)
      return res.status(500).json('Failed to get users')
    }
    res.status(200).json(data.length > 0)
  });
});


router.get('/is-username-bussy/:value', function(req, res, next) {
  let query =  {username: req.params.value}
  User.getAll(query, (err, data) => {
    if (err) {
      console.error("route users get:", err)
      return res.status(500).json('Failed to get users')
    }
    res.status(200).json(data.length > 0)
  });
});



// example protected wrong url
router.delete('/protected/example', passport.authenticate('jwt', { session: false }),  function(req, res, next) {
  res.status(200).send('Protected');
});



module.exports = router;



