const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars')

const User = require('../models/user');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SENDER, // Cambialo por tu email
        pass: process.env.EMAIL_PASSWORD // Cambialo por tu password
    }
});


const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: './api/templates/emails/partials/',
        layoutsDir: './api/templates/emails/',
        /////// defaultLayout: formulario.template,
    },
    viewPath: './api/templates/emails/',
    extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));






// only for test
module.exports.processMain = function(data) {
    var context = data.context

    const mailOptions = {
        from: `"Gerencia" <embai@gmail.com>`,
        to: data.to,
        subject: data.subject,
        template: "main",
        context: context
    };
    sendEmail(mailOptions)
}




module.exports.processMasiveMails = function(data) {
    User.find({
        '_id': { $in: data.users }
    }, function(err, docs){
        for (let id in docs) {
            let user = docs[id]

            const mailOptions = {
                from: `"Gerencia" <embai@gmail.com>`,
                to: user.email,
                subject: data.subject,
                template: "main",
                context: {
                    username: user.name,
                    message: data.message
                }
            };
            sendEmail(mailOptions)
        }
        //console.error(err);
        //console.log(docs);
    });
}










function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error(err)
            return;
        }
        console.log("email response: ", info.response);
    });
}