const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', 
    port: 587, // for TLS protocol
    secure: false,
    auth: {
        user: '17gietuece032@gmail.com',
        pass: 'jtwzpcvhnvptgfyc'
    }
}, (err) => {
    console.log(err);

});


// defining that we are going to use ejs for mail template
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}