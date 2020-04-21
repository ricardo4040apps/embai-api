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
            solicitudCard: formulario.solicitud.card,
            solicitudAppointmentDate: formulario.solicitud.appointmentDate,
            solicitudRefExt: formulario.solicitud.refExt,
            solicitudClabe: formulario.solicitud.clabe,
            solicitudBank: formulario.solicitud.bank,
            solicitudAuthorization: formulario.solicitud.authorization,
            ///VALUATION
            valuationItem: formulario.valuation.item,
            valuationMaterial: formulario.valuation.material,
            valuationWeight: formulario.valuation.weight,
            valuationValue: formulario.valuation.value,
            valuationLoanDate: formulario.valuation.loanDate,
            valuationRecommendedLoan: formulario.valuation.recommendedLoan,
            valuationCondition: formulario.valuation.condition,
            valuationDescription: formulario.valuation.description,


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