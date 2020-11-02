const path = require('path');
const nunjucks = require('nunjucks');
const MailService = require('./mail.service');
const UserService = require('./user.service');

const TEMPLATE_PATH = path.resolve(__dirname, "../templates"); 
nunjucks.configure(TEMPLATE_PATH, { autoescape: true });

exports.userOtpTemplate = async(userData) => {
    try {
        const data = await UserService.getUserData({ email: userData.email });
        console.log(`Sending Email to minhaj.pamanetwork@gmail.com`);
        const emailOptions = {
            from: process.env.SENDER_MAIL,
            to: 'minhaj.pamanetwork@gmail.com',
            subject: 'Test Email',
            html: TemplateForUserOtp(data)
        }
        const sendMail = await MailService.sendMail(emailOptions);
        if(sendMail) {
            console.log(`Email Sent Successfully to minhaj.pamanetwork@gmail.com`);
        } 
    } catch(err) {
        console.log('Error', err);
    }
}

const TemplateForUserOtp = (data) => {
    console.log('data', data);
    return nunjucks.render('verification_template.html', {
        otp: data.otp
    });
}

