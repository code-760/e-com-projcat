const nodemailer = require("nodemailer");


let teranspoter=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "himanshu760kumawat@gmail.com",
      pass: "nxpfasuhplnabzwy",
    },
  });


module.exports = { teranspoter };
