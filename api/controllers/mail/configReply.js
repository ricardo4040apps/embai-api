const nodemailer = require('nodemailer');
module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER, // Cambialo por tu email
            pass: process.env.EMAIL_PASSWORD // Cambialo por tu password
        }
    });
    const mailOptions = {
        from: `"Embai" <siruizro@ittepic.edu.mx>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: `"Respuesta a tu mensaje de contacto"`,
        html: `
 <strong>Respuesta:</strong> ${formulario.reply}
 `
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}