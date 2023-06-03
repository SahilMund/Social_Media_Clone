const nodeMailer = require('../config/nodemailer');
const User = require('../models/user');

// this is another way of exporting a method
exports.newComment = async (comment) => {

    // Defining template that will be used to sneding mails
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

   // let recipient = await User.findById(comment.user);
    nodeMailer.transporter.sendMail({
       from: 'ribej76380@prolug.com',
       to: comment.user?.email || 'USER_EMAIL_NOT_FOUND',
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}