var nodemailer = require('nodemailer');

// Create common function to send email
module.exports = {
    sendmail: function (ToEmail, Subject, Body) {
     	let transporter = nodemailer.createTransport({
         host: 'mail-b01.cloudmailbox.in',
         secure: false,
         auth: {
             user: 'test@mail-b01.cloudmailbox.in',
             pass: 'DEfER#e'
         }
        });
        let mailOptions = {
        from: '"test.org" <info@test.org>', // sender address
        to: ToEmail, // list of receivers
        subject: Subject, // Subject line
        html: Body
        };
       	// send mail with defined transport object
        
        transporter.sendMail(mailOptions, (error2, info) => {
            if (error2) {
                return console.log("RESULT ERROR = ", error2);
            }
        });

    },
   // Create HTML for send OTP email of Sign In
    SignInOTPHTML: function (otpno)
   {
	var html = `<table align="center" style="width: 100%;border:solid;border-radius: 8px;">
        <tr><td style="width: 100%; text-align: center;">
        <img height="99" src="https://test.test.org/images/logo_transparent.png" width="101" /></td>
        </tr><tr><td style="font-size: 20px; font-family: ambleregular; text-align: center;background:#1f253d; color: #FFF;">
        <br/>Sign In - OTP Alert<br/>&nbsp;</td></tr>
        <tr><td style="width: 100%; text-align: center; background: #394264; color: #FFF;">
        <table align="center" style="width: 40%; text-align: left;color: #FFF;">
        <tr><td><strong>Hi,</strong><br/><br/><br/>Please use OTP ${otpno} to verify your Sign In. <br/>
        <br/><br/><br/><br/><br/><strong>Thank You,<br /><br/>test Support</strong></td></tr></table></td></tr>
        <tr><td style="font-size: 20px; font-family: ambleregular; text-align: center;background:#1f253d; color: #FFF;">
        <br/></td></tr></table>`

	return html;
   },
}
