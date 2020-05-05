var express = require('express');
var router = express.Router();
const Payment = require('../models/payment');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Payment.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Payment get:", err)
            return res.status(500).json('Failed to get Payment')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Payment.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Payment get:", err)
            return res.status(500).json('Failed to get Payment')
        }
        res.status(200).json(data)
    });
}

module.exports.getByIdUser = function(req, res, next) {
    req.query.userId = req.params.id //userId es el nombre del campo por el que buscaras
    Payment.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Payment get:", err)
            return res.status(500).json('Failed to get  Payment')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Payment.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Payment.add(req.body, (err, data) => {
        if (err) {
            console.error("route Payment post:", err)
            return res.status(500).json('Failed to register new Payment')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Payment.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Payment put:", err)
            return res.status(500).json('Failed to update Payment')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Payment.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Payment delete:", err)
            return res.status(500).json('Failed to delete Payment')
        }
        res.status(204).json(data)
    });
}