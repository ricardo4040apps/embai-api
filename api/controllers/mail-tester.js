const Interests = require('../models/interests');
const mailSender = require('./mail-sender');



// only for test
module.exports.sendMain = function(req, res, next) {
    let data = {
        to: 'ricardoplascencia680@hotmail.com',
        subject: 'test hola',
        context: {
            username: 'ricardoplascencia680@hotmail.com',
            message: 'NO OSADOASDO ASDOADOADO ASDOAOA DADA ADOODADOASOD O DASO OAD '    
        }
    }

    mailSender.processMain(data)

    // return res.status(400).json(errors.message)
    res.status(201).json({})
}




module.exports.sendMasive = function(req, res, next) {
    let data = {
        users: ['5ea0b0417f6a8948f89f3d77', '5e9f3f9a5fec0a4020aba12b'],
        subject: 'test hola',
        message: 'NO OSADOASDO ASDOADOADO ASDOAOA DADA ADOODADOASOD O DASO OAD '    
    }
    
    mailSender.processMasiveMails(data)

    // return res.status(400).json(errors.message)
    res.status(201).json({})
}

