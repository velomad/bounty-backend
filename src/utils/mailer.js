var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const sendMail = async ({ emailAddress, subject, emailBody }) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "sagaryc111@gmail.com",
        pass: "xtrainn213"
      }
    })
  );

  const mailOptions = {
    from: "sagaryc111@gmail.com", // sender address
    to: emailAddress, // list of receivers
    subject: subject, // Subject line
    text: emailBody
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = { sendMail };
