var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passportMiddleware = require('../middlewares/passport');
const mailCtrl = require('../controllers/mail/registerUser');

/////////////CUSTOM
module.exports.searchUsers = function(req, res, next) {
    
    let query = { username: req.params.value }
    console.log(req.params.value)
    User.getAll(query, (err, data) => {
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }
        console.log("DATA", data)
        if (data.length === 0) {
            console.log("VACIO")
            return

        }
        console.log("ENCONTRADO!")
        var respuesta = {
            id: data[0]._id,
            name: data[0].name,
            lastName: data[0].lastName,
            userName: data[0].username,
            email: data[0].email,
        }
        console.log("RESPUESTA", respuesta)
        res.status(200).json(respuesta)


    });
}


module.exports.createClient = function(req, res, next) {
    let errors = User.hasErrors(req.body);
    if (errors) return res.status(400).json(errors.message)


    /// AAAAAAqui va restriccicon de campos para luis

    User.add(req.body, (err, data) => {
        if (err) {
            console.error("route users post:", err)
            return res.status(500).json('Failed to register new User')
        }
        let user = {
            user: data,
            template: 'newuser'
        }
        res.status(201).json(data)
        mailCtrl(user)

        //res.status(201).json('User registered')
    });
}

//////////



/* GET users listing. */

module.exports.get = function(req, res, next) {
    User.getAll(req.query, (err, data) => {
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }
        res.status(200).json(data)
    });
}

module.exports.getById = function(req, res, next) {
    User.getById(req.params.id, (err, data) => {
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get user')
        }
        res.status(200).json(data)
    });
}


module.exports.create = function(req, res, next) {
    let errors = User.hasErrors(req.body);
    console.log(errors)
    if (errors) return res.status(400).json(errors.message)

    User.add(req.body, (err, data) => {
        if (err) {
            console.error("route users post:", err)
            return res.status(500).json('Failed to register new User')
        }
        let user = {
            user: data,
            template: 'newuser'
        }
        res.status(201).json(data)
        mailCtrl(user)

        //res.status(201).json('User registered')
    });
}


module.exports.update = function(req, res, next) {
    User.update(req.params.id, req.body, (err, data) => {
        if (err) {
            console.error("route users put:", err)
            return res.status(500).json('Failed to update User')
        }
        res.status(200).json(data)
    });
}


module.exports.deleteById = function(req, res, next) {
    User.deleteById(req.params.id, (err, data) => {
        if (err) {
            console.error("route users delete:", err)
            return res.status(500).json('Failed to delete user')
        }
        res.status(204).json(data)
    });
}


module.exports.isEmailBussy = function(req, res, next) {
    let query = { email: req.params.value }
    User.getAll(query, (err, data) => {
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }
        res.status(200).json(data.length > 0)
    });
}

module.exports.isCellPhoneBussy = function(req, res, next) {
    let query = { cellPhone: req.params.value }
    User.getAll(query, (err, data) => {
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }
        res.status(200).json(data.length > 0)
    });
}



module.exports.isUsernameBussy = function(req, res, next) {
    let query = { username: req.params.value }
    User.getAll(query, (err, data) => {
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }
        res.status(200).json(data.length > 0)
    });

}

module.exports.searchUsers = function(req, res, next) {
    let query = { username: req.params.value }
    console.log(req.params.value)
    User.getAll(query, (err, data) => {
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }
        console.log("DATA", data)
        if (data.length === 0) {
            console.log("VACIO")
            return

        }
        console.log("ENCONTRADO!")
        var respuesta = {
            id: data[0]._id,
            name: data[0].name,
            lastName: data[0].lastName,
            userName: data[0].username,
            email: data[0].email,
        }
        console.log("RESPUESTA", respuesta)
        res.status(200).json(respuesta)
    });
}