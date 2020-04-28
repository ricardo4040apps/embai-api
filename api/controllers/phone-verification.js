var express = require('express');
const accountSid = process.env.TWILIO_ACCOUNT_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

const User = require('../models/user');
const PhoneCode = require('../models/phone-code');

const { v4: uuidv4 } = require('uuid');


// https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#verify-your-personal-phone-number

module.exports.generatePhoneCode = function (req, res, next) {

    var dataCode = {
        cellPhone: `${req.body.countryCode}${req.body.cellPhone}`,
        code: generateCode(),
        id: uuidv4()
    }

    PhoneCode.update(dataCode.cellPhone, dataCode, (err, doc) => {
        if (err) {
            console.error("route PhoneVerification generatePhoneCode:", err)
            return res.status(500).json('Failed to generate code from PhoneVerification')
        }
        client.messages
            .create({
                body: `El odigo de seguridad para EMBAI es ${dataCode.code}`,
                from: process.env.TWILIO_PHONE,
                to: dataCode.cellPhone
                // to: '+523781116165'
            })
            .then(message => {
                // errorCode
                // errorMessage
                console.log("Send sms", message.body)

                let resp = {
                    id: dataCode.id
                }
                res.status(200).json(resp)
            })
            .done();
    });


}


module.exports.verifyPhoneCode = function (req, res, next) {
    
    var dataCode = {
        cellPhone: `${req.body.countryCode}${req.body.cellPhone}`,
        code: req.body.code,
        id: req.body.id
    }

    PhoneCode.getOne(dataCode, (err, doc) => {
        if (err) {
            console.error("route PawnObjectTypes put:", err)
            return res.status(500).json('Failed to get PawnObjectTypes')
        }
        if (!doc) return res.status(404).json('Not valid!')            

        User.update(req.body.userId, {cellPhoneVerified: true},  (err, data) => {
            if (err) {
                console.error("user update:", err)
                return res.status(500).json('Failed to update user')
            }
    
            res.status(200).json('Ok!')    
        });

    });


    
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                    P R I V A T E   F U N C T I O N S
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


function generateCode() {
    //const generateCode = function() {
    return Math.floor(100000 + Math.random() * 900000);
}





/*

var express = require('express');
const accountSid = process.env.TWILIO_ACCOUNT_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

const User = require('../models/user');
const PhoneCode = require('../models/phone-code');




// https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#verify-your-personal-phone-number

module.exports.generatePhoneCode = function (req, res, next) {
    User.getById(req.body.userId, (err, data) => {
        if (err || !data) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get user')
        }

        var dataCode = {
            code: generateCode(),
            cellPhone: `${data.countryCode}${data.cellPhone}`
        }

        PhoneCode.update(req.body.userId, dataCode, (err, doc) => {
            if (err) {
                console.error("route PawnObjectTypes put:", err)
                return res.status(500).json('Failed to update PawnObjectTypes')
            }
            client.messages
                .create({
                    body: `Código de EMBAI - ${dataCode.code}`,
                    from: process.env.TWILIO_PHONE,
                    to: `${data.countryCode}${data.cellPhone}`
                    // to: '+523781116165'
                })
                .then(message => {
                    // errorCode
                    // errorMessage
                    console.log("Send sms", message.body)
                    res.status(200).json('Sent')
                })
                .done();
        });

    });

}


module.exports.verifyPhoneCode = function (req, res, next) {
    User.getById(req.body.userId, (err, data) => {
        if (err || !data) {
            console.error("route users get:", err)
            return res.status(500).json('Failed to get user')
        }

        var dataCode = {
            code: req.body.code,
            user: req.body.userId,
            cellPhone: `${data.countryCode}${data.cellPhone}`
        }

        PhoneCode.getOne(dataCode, (err, doc) => {
            if (err) {
                console.error("route PawnObjectTypes put:", err)
                return res.status(500).json('Failed to get PawnObjectTypes')
            }
            if (!doc) return res.status(404).json('Not valid!')            

            User.update(req.body.userId, {cellPhoneVerified: true},  (err, data) => {
                if (err) {
                    console.error("user update:", err)
                    return res.status(500).json('Failed to update user')
                }
        
                res.status(200).json('Ok!')    
            });

        });

    });

}




 function generateCode() {
    //const generateCode = function() {
    return Math.floor(100000 + Math.random() * 900000);
}

*/