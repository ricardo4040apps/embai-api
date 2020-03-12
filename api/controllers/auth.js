var express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
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
                const token = jwt.sign(user.toJSON(), config.database.secret, {
                    expiresIn: 24 * 60 * 60
                })

                res.status(200).json({
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,

                        //// continue...
                    }
                })
            } else {
                return res.status(401).json('Wrong password')
            }
        })
    })

}
