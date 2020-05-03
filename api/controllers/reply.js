var express = require('express');
var router = express.Router();
const Reply = require('../models/reply');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Reply.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Reply get:", err)
            return res.status(500).json('Failed to get Reply')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    let populate = req.query.populate || '';

    Reply.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Reply get:", err)
            return res.status(500).json('Failed to get Reply')
        }
        res.status(200).json(data)
    }, populate);
}


module.exports.create = function(req, res, next) {
    let errors = Reply.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Reply.add(req.body, (err, data) => {
        if (err) {
            console.error("route Reply post:", err)
            return res.status(500).json('Failed to register new Reply')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Reply.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Reply put:", err)
            return res.status(500).json('Failed to update Reply')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Reply.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Reply delete:", err)
            return res.status(500).json('Failed to delete Reply')
        }
        res.status(204).json(data)
    });
}