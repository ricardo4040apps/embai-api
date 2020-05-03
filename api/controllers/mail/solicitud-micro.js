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
        to: `${ formulario.solicitud.email}`, // Cambia esta parte por el destinatario
        subject: formulario.solicitud.type,
        template: formulario.template,
        context: {
            username: formulario.solicitud.email,
            //SOLICITUD
            solicitudType: formulario.solicitud.type,
            solicitudName: formulario.solicitud.name,
            solicitudLastName: formulario.solicitud.lastName,
            solicitudEmail: formulario.solicitud.email,
            solicitudCard: formulario.solicitud.card,
            solicitudAppointmentDate: formulario.solicitud.appointmentDate,
            solicitudRefExt: formulario.solicitud.refExt,
            solicitudClabe: formulario.solicitud.clabe,
            solicitudBank: formulario.solicitud.bank,
            solicitudAuthorization: formulario.solicitud.authorization,
            //// MICRO
            microPhone: formulario.solicitud.phone,
            microSocial: formulario.solicitud.social,
            microLoanRequested: formulario.solicitud.loanRequested,
            microPaymentPlan: formulario.solicitud.paymentPlan,
            microMonths: formulario.solicitud.months,

        }

    };


    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}