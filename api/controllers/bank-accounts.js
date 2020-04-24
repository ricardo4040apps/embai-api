var express = require('express');
var router = express.Router();
const Accounts = require('../models/bank-accounts');
const passportMiddleware = require('../middlewares/passport');
const User = require('../models/user');

/* GET users listing. */

module.exports.get = function(req, res, next) {
    Accounts.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route  Accounts get:", err)
            return res.status(500).json('Failed to get  Accounts')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    Accounts.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route  Accounts get:", err)
            return res.status(500).json('Failed to get  Accounts')
        }
        res.status(200).json(data)
    });
}

module.exports.getInfoUser = function(req, res, next) {
    Accounts.getAll(req.query, function(err, dataBanco) {
        User.populate(dataBanco, { path: "user" }, function(err, dataBanco) {
            res.status(200).send(dataBanco)
            console.log("Data banco", dataBanco)

        });
    });
}

module.exports.getByIdUser = function(req, res, next) {
    req.query.user = req.params.id
    Accounts.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route Bank Accounts get:", err)
            return res.status(500).json('Failed to get  Bank Accounts')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = Accounts.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    Accounts.add(req.body, (err, data) => {
        if (err) {
            console.error("route Accounts post:", err)
            return res.status(500).json('Failed to register new  Accounts')
        }
        res.status(201).json(data)
            //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    Accounts.update(req.params.id, req.body, (err, user) => {
        if (err) {
            console.error("route Accounts put:", err)
            return res.status(500).json('Failed to update Accounts')
        }
        res.status(200).json(user)
    });
}


module.exports.deleteById = function(req, res, next) {
    Accounts.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route Accounts delete:", err)
            return res.status(500).json('Failed to delete Accounts')
        }
        res.status(204).json(data)
    });
}