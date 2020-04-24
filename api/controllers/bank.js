var express = require('express');
var router = express.Router();
const Bank = require('../models/bank');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Bank.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Bank get:", err)
            return res.status(500).json('Failed to get Bank')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Bank.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Bank get:", err)
            return res.status(500).json('Failed to get Bank')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Bank.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Bank.add(req.body, (err, data) => {
        if (err) {
            console.error("route Bank post:", err)
            return res.status(500).json('Failed to register new Bank')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Bank.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Bank put:", err)
            return res.status(500).json('Failed to update Bank')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Bank.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Bank delete:", err)
            return res.status(500).json('Failed to delete Bank')
        }
        res.status(204).json(data)
    });
}