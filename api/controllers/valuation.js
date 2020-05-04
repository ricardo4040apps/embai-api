var express = require('express');
var valuationRouter = express.Router();
const Valuation = require('../models/valuation');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Valuation.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Valuation get:", err)
            return res.status(500).json('Failed to get Valuation')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Valuation.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Valuation get:", err)
            return res.status(500).json('Failed to get Valuation')
        }
        res.status(200).json(data)
    });
}

module.exports.getByIdUser = function(req, res, next) {
    req.query.valuatorId = req.params.id //ReceiverId es el nombre del campo por el que buscaras
    Valuation.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Valuation get:", err)
            return res.status(500).json('Failed to get  Valuation')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Valuation.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Valuation.add(req.body, (err, data) => {
        if (err) {
            console.error("route Valuation post:", err)
            return res.status(500).json('Failed to register new Valuation')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Valuation.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Valuation put:", err)
            return res.status(500).json('Failed to update Valuation')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Valuation.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Valuacion delete:", err)
            return res.status(500).json('Failed to delete Valuacion')
        }
        res.status(204).json(data)
    });
}