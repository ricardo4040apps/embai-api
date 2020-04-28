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
        // console.log("FECHA FINAL", fechaFinal)
        // console.log("DIA", dia)
        // console.log("MES", mes)
        // console.log("AÑO", año)
        // var fechaFinal = new Date(año, mes, dia)


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
            // solicitudCard: formulario.solicitud.card,
            // solicitudRefExt: formulario.solicitud.refExt,
            // solicitudClabe: formulario.solicitud.clabe,
            // solicitudBank: formulario.solicitud.bank,
            // solicitudAuthorization: formulario.solicitud.authorization,
            ///VALUATION
            valuationItem: formulario.valuation.item,
            valuationMaterial: formulario.valuation.material,
            valuationRequestedLoan: formulario.valuation.requestedLoan,
            // valuationWeight: formulario.valuation.weight,
            // valuationValue: formulario.valuation.value,
            // valuationLoanDate: formulario.valuation.loanDate,
            // valuationRecommendedLoan: formulario.valuation.recommendedLoan,
            // valuationCondition: formulario.valuation.condition,
            // valuationDescription: formulario.valuation.description,


        }
        // ,
        // attachments: [{
        //         filename: 'twitter.png',
        //         path: './public/img/',
        //         cid: 'twitter' //same cid value as in the html img src
        //     }, {
        //         filename: 'facebook.png',
        //         path: './public/img/',
        //         cid: 'facebook' //same cid value as in the html img src
        //     }, {
        //         filename: 'gmail.png',
        //         path: './public/img/',
        //         cid: 'gmail' //same cid value as in the html img src
        //     }, {
        //         filename: 'logo.jfif',
        //         path: './public/img/',
        //         cid: 'logo' //same cid value as in the html img src
        //     }, ]
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