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

    var fechaRecibida = new Date(formulario.solicitud.appointmentDate);
    var dia = fechaRecibida.getDate();
    var mes = fechaRecibida.getMonth();
    var año = fechaRecibida.getFullYear();

    if (mes == 0) {
        mes = "Enero"
    }
    if (mes == 1) {
        mes = "Febrero"
    }
    if (mes == 2) {
        mes = "Marzo"
    }
    if (mes == 3) {
        mes = "Abril"
    }
    if (mes == 4) {
        mes = "Mayo"
    }
    if (mes == 5) {
        mes = "Junio"
    }
    if (mes == 6) {
        mes = "Julio"
    }
    if (mes == 7) {
        mes = "Agosto"
    }
    if (mes == 8) {
        mes = "Septiembre"
    }
    if (mes == 9) {
        mes = "Octumbre"
    }
    if (mes == 10) {
        mes = "Noviembre"
    }
    if (mes == 11) {
        mes = "Diciembre"
    }

    var fechaFinal = (dia + " de " + mes + " del " + año)


    const mailOptions = {
        from: `"Gerencia" <embai@gmail.com>`,
        to: `${formulario.solicitud.email}`, // Cambia esta parte por el destinatario
        subject: formulario.solicitud.type,
        template: formulario.template,
        context: {
            username: formulario.solicitud.email,
            //SOLICITUD
            solicitudType: formulario.solicitud.type,
            solicitudName: formulario.solicitud.name,
            solicitudLastName: formulario.solicitud.lastName,
            solicitudEmail: formulario.solicitud.email,
            solicitudAppointmentDate: fechaFinal,
            solicitudPhone: formulario.solicitud.phone,
            solicitudSocial: formulario.solicitud.social,
            ///VALUATION
            valuationItem: formulario.valuation.item,
            valuationMaterial: formulario.valuation.material,
            valuationRequestedLoan: formulario.valuation.requestedLoan,

        }

    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}