var express = require('express');
var router = express.Router();
const Tabla = require('../models/tabla-amortizacion');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Tabla.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Tabla get:", err)
            return res.status(500).json('Failed to get Tabla')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Tabla.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Tabla get:", err)
            return res.status(500).json('Failed to get Tabla')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Tabla.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Tabla.add(req.body, (err, data) => {
        if (err) {
            console.error("route Tabla post:", err)
            return res.status(500).json('Failed to register new Tabla')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Tabla.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Tabla put:", err)
            return res.status(500).json('Failed to update Tabla')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Tabla.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Tabla delete:", err)
            return res.status(500).json('Failed to delete Tabla')
        }
        res.status(204).json(data)
    });
}