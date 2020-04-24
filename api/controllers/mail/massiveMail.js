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

    // console.log(process.env.EMAIL_SENDER, process.env.EMAIL_PASSWORD)
    const handlebarOptions = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: './views/partials/',
            layoutsDir: './views/',
            defaultLayout: formulario.template,
        },
        viewPath: './views/',
        extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));

    // var mensajeRecibido = formulario.message;
    // var mensajeFinal;
    // mensajeFinal.insertAdjacentHTML('afterend', formulario.message);
    // console.log("MENSAJE DE FORMULARIO", mensajeFinal)


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
    // console.log(mailOptions)
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error(err)
            return;
        }
        console.log("masiveMail sent", info);
    });
}