const nodemailer = require('nodemailer');
// const ejs = require('ejs')
var hbs = require('nodemailer-express-handlebars')
    // var header = require('../public/mail-templates/header.html');
    // var footer = require('../public/mail-templates/footer.html');
    // var header = document.body.innerHTML = './public/mail-templates/header';

module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ivleestradasa@ittepic.edu.mx', // Cambialo por tu email
            pass: 'pjsklnlpr81' // Cambialo por tu password
        },

    });

    const handlebarOptions = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: './views/partials/',
            layoutsDir: './views/',
            defaultLayout: 'main',
        },
        viewPath: './views/',
        extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));


    const mailOptions = {
        from: `"Gerencia" <embai@gmail.com>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: formulario.subject,
        // html: '<b>hola 2</b>'
        // html: { path: './views/main.hbs' },
        template: 'main',
        context: {
            username: formulario.email,
            message: formulario.message,

        }
        // html: { path: './views/main.ejs' },

        // { path: './public/mail-templates/header.ejs' },
        // { path: './public/mail-templates/footer.ejs' },,
        // attachments: [{
        //     filename: 'header.html',
        //     path: './public/mail-templates/header.html'

        // }]

    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}