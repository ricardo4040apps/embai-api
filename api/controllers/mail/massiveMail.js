const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars')

module.exports = (formulario) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER, // Cambialo por tu email
            pass: process.env.EMAIL_PASSWORD // Cambialo por tu password
        },
    });

    const handlebarOptions = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: './api/templates/emails/partials/',
            layoutsDir: './api/templates/emails/',
            defaultLayout: formulario.template,
        },
        viewPath: './api/templates/emails/',
        extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));


    const mailOptions = {
        from: `"Gerencia" <embai@gmail.com>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: formulario.subject,
        template: formulario.template,
        context: {
            username: formulario.email,
            message: formulario.message,
            urlApi: process.env.PUBLIC_URL
        }

    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error(err)
            return;
        }
        console.log("masiveMail sent", info);
    });
}