var express = require('express');
var router = express.Router();
const Contact = require('../models/contact');
const passportMiddleware = require('../middlewares/passport');


/* GET users listing. */

module.exports.get = function(req, res, next) {
    Contact.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Contact get:", err)
            return res.status(500).json('Failed to get Contact')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Contact.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Contact get:", err)
            return res.status(500).json('Failed to get Contact')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Contact.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Contact.add(req.body, (err, data) => {
        if (err) {
            console.error("route Contact post:", err)
            return res.status(500).json('Failed to register new Contact')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Contact.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Contact put:", err)
            return res.status(500).json('Failed to update Contact')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Contact.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Contact delete:", err)
            return res.status(500).json('Failed to delete Contact')
        }
        res.status(204).json(data)
    });
}