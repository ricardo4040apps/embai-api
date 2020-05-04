var express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const AuthToken = require('../models/auth-token');
const config = require('../config/app');


/* GET users listing. */
module.exports.auth = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getByUsername(username, (err, user) => {        
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }

        if (!user) return res.status(404).json('User not found')

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                let respToken = generateToken(user);
                res.status(200).json(respToken)
            } else {
                return res.status(401).json('Wrong password')
            }
        })
    })

}

module.exports.authClient = function(req, res, next) {
    const cellPhone = req.body.cellPhone;
    const password = req.body.password;

    User.getByCellPhone(cellPhone, (err, user) => {        
        if (err) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get users')
        }

        if (!user) return res.status(404).json('User not found')

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                let respToken = generateToken(user);
                res.status(200).json(respToken)
            } else {
                return res.status(401).json('Wrong password')
            }
        })
    })

}



function generateToken(user) {
    let expiration = 24 * 60 * 60;
    //let expiration = 60;
    const token = jwt.sign(user.toJSON(), config.database.secret, {
        expiresIn: expiration
    })

    let data = {
        token: token,
        user: user._id,
        // expiration
    }
    AuthToken.add(data,  () => {}) // not necesary the action

    return {
        token: `JWT ${token}`,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            picture: user.picture,
        }
    }
}


module.exports.generateToken = generateToken
