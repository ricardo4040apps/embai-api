var express = require('express');
var router = express.Router();
const Frequency = require('../models/frequency');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Frequency.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Frequency get:", err)
            return res.status(500).json('Failed to get Frequency')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Frequency.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Frequency get:", err)
            return res.status(500).json('Failed to get Frequency')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Frequency.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Frequency.add(req.body, (err, data) => {
        if (err) {
            console.error("route Frequency post:", err)
            return res.status(500).json('Failed to register new Frequency')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Frequency.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Frequency put:", err)
            return res.status(500).json('Failed to update Frequency')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Frequency.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Frequency delete:", err)
            return res.status(500).json('Failed to delete Frequency')
        }
        res.status(204).json(data)
    });
}