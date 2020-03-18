var express = require('express');
var router = express.Router();
const Prendas = require('../models/prendas');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Prendas.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Prendas get:", err)
            return res.status(500).json('Failed to get Prendas')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Prendas.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Prendas get:", err)
            return res.status(500).json('Failed to get Prendas')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Prendas.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Prendas.add(req.body, (err, data) => {
        if (err) {
            console.error("route Prendas post:", err)
            return res.status(500).json('Failed to register new Prendas')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Prendas.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Prendas put:", err)
            return res.status(500).json('Failed to update Prendas')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Prendas.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Prendas delete:", err)
            return res.status(500).json('Failed to delete Prendas')
        }
        res.status(204).json(data)
    });
}