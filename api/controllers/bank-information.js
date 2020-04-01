var express = require('express');
var router = express.Router();
const Bank = require('../models/bank-information');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Bank.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Bank Information get:", err)
            return res.status(500).json('Failed to get Credit Information')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Bank.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Bank Information get:", err)
            return res.status(500).json('Failed to get Bank Information')
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
            console.error("route Bank Information post:", err)
            return res.status(500).json('Failed to register new Bank Information')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Bank.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Bank Information put:", err)
            return res.status(500).json('Failed to update Bank Information')
        }
        res.status(200).json(user)
    });
}

module.exports.deleteById = function(req, res, next) {
    Bank.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Bank information delete:", err)
            return res.status(500).json('Failed to delete Bank information')
        }
        res.status(204).json(data)
    });
}