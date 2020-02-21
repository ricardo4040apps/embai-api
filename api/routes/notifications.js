var express = require('express');
var router = express.Router();
const Notification = require('../models/notification');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

router.get('/', passportMiddleware, function(req, res, next) {
    Notification.getAll(req.query, (err, data) => {
      if (err) {
        console.error("route notifications get:", err)
        return res.status(500).json('Failed to get notification')
      }
      res.status(200).json(data)
    });
});

router.get('/:id', passportMiddleware, function(req, res, next) {
    Notification.getById(req.params.id, (err, data) => {
    if (err) {
      console.error("route notifications get:", err)
      return res.status(500).json('Failed to get notification')
    }
    res.status(200).json(data)
  });
});


router.post('/', passportMiddleware, function(req, res, next) {
  let errors =  Notification.hasErrors(req.body);
  console.log(errors)
  if (errors) return res.status(400).json(errors.message)

  Notification.add(req.body, (err, data) => {
    if (err) {
      console.error("route notifications post:", err)
      return res.status(500).json('Failed to register new notification')
    }
    res.status(201).json(data)
    //res.status(201).json('User registered')
  });
});


router.put('/:id', passportMiddleware, function(req, res, next) {
    Notification.update(req.params.id, req.body, (err, user) => {
    if (err) {
      console.error("route notifications put:", err)
      return res.status(500).json('Failed to update notification')
    }
    res.status(200).json(user)
  });
});


router.delete('/:id', passportMiddleware, function(req, res, next) {
    Notification.deleteById(req.params.id, (err, data) => {
    if (err) {
      console.error("route notifications delete:", err)
      return res.status(500).json('Failed to delete notification')
    }
    res.status(204).json(data)
  });
});



module.exports = router;



