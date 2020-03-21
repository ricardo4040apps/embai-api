var express = require('express');
var router = express.Router();
const Peso = require('../models/peso');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Peso.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Peso get:", err)
            return res.status(500).json('Failed to get Peso')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Peso.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Peso get:", err)
            return res.status(500).json('Failed to get Peso')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Peso.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Peso.add(req.body, (err, data) => {
        if (err) {
            console.error("route Peso post:", err)
            return res.status(500).json('Failed to register new Peso')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Peso.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Peso put:", err)
            return res.status(500).json('Failed to update Peso')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Peso.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Peso delete:", err)
            return res.status(500).json('Failed to delete Peso')
        }
        res.status(204).json(data)
    });
}