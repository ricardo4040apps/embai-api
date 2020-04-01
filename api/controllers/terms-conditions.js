var express = require('express');
var router = express.Router();
const Terms = require('../models/terms-conditions');

/* GET AVISOS listing. */

module.exports.get = function(req, res, next) {
    Terms.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Terms of privacy get:", err)
            return res.status(500).json('Failed to get  Terms of privacy')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Terms.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Terms of privacy get:", err)
            return res.status(500).json('Failed to get  Terms of privacy')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Terms.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Terms.add(req.body, (err, data) => {
        if (err) {
            console.error("route Terms of privacy post:", err)
            return res.status(500).json('Failed to register new  Terms of privacy')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Terms.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Terms of privacy put:", err)
            return res.status(500).json('Failed to update Terms of privacy')
        }
        res.status(200).json(user)
    });
}

module.exports.deleteById = function(req, res, next) {
    Terms.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Terms of privacy delete:", err)
            return res.status(500).json('Failed to delete Terms of privacys')
        }
        res.status(204).json(data)
    });
}