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
            partialsDir: './views/partials/',
            layoutsDir: './views/',
            defaultLayout: formulario.template,
        },
        viewPath: './views/',
        extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));



    const mailOptions = {
        from: `"Gerencia" <embai@gmail.com>`,
        to: `${formulario.user.email}`, // Cambia esta parte por el destinatario
        subject: `Bienvenido!`,
        template: formulario.template,
        context: {
            /// NEW USER
            newUserName: formulario.user.name,
            newUserLastName: formulario.user.lastName,
            newUser: formulario.user.username,
            newUserPhone: formulario.user.phone,
            newUserMail: formulario.user.email,

        }
        // html: { path: './views/main.ejs' },

        // { path: './public/mail-templates/header.ejs' },
        // { path: './public/mail-templates/footer.ejs' },,
        // attachments: [{
        //     filename: 'header.html',
        //     path: './public/mail-templates/header.html'

        // }]

    };
    // console.log(mailOptions)
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}