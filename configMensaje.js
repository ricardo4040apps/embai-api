const nodemailer = require('nodemailer');
module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ivleestradasa@ittepic.edu.mx', // Cambialo por tu email
            pass: 'pjsklnlpr81' // Cambialo por tu password
        }
    });
    const mailOptions = {
        from: `"Gerencia" <embai@gmail.com>`,
        to: `${formulario.email}`, // Cambia esta parte por el destinatario
        subject: formulario.subject,
        html: `
 <strong>Nombre:</strong> ${formulario.users} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.message}
 `
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}