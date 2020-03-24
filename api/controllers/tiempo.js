var express = require('express');
var router = express.Router();
const Tiempo = require('../models/tiempo');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Tiempo.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Tiempo get:", err)
            return res.status(500).json('Failed to get Tiempo')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Tiempo.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Tiempo get:", err)
            return res.status(500).json('Failed to get Tiempo')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Tiempo.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Tiempo.add(req.body, (err, data) => {
        if (err) {
            console.error("route Tiempo post:", err)
            return res.status(500).json('Failed to register new Tiempo')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Tiempo.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Tiempo put:", err)
            return res.status(500).json('Failed to update Tiempo')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Tiempo.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Tiempo delete:", err)
            return res.status(500).json('Failed to delete Tiempo')
        }
        res.status(204).json(data)
    });
}