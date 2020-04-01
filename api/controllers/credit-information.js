var express = require('express');
var router = express.Router();
const Credit = require('../models/credit-information');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Credit.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Credit Information get:", err)
            return res.status(500).json('Failed to get Credit Information')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Credit.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Credit Information get:", err)
            return res.status(500).json('Failed to get Credit Information')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Credit.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Credit.add(req.body, (err, data) => {
        if (err) {
            console.error("route Credit Information post:", err)
            return res.status(500).json('Failed to register new Credit Information')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Credit.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Credit Information put:", err)
            return res.status(500).json('Failed to update Credit Information')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Credit.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Material delete:", err)
            return res.status(500).json('Failed to delete Material')
        }
        res.status(204).json(data)
    });
}