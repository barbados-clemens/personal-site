const sg = require('@sendgrid/mail');
sg.setApiKey(process.env.SENDGRID_API_KEY);

/**
 *
 * @param {string} email
 * @param {string} token
 * @returns {Promise<boolean>}
 */
exports.sendEmail = async function (email, token) {
  // Sends email to user after signup
  const msg = {
    to: email,
    from: 'newsletter@calebukle.com',
    templateId: 'd-2a5493d5c28d478fa42d119e28f1d4c2',
    dynamic_template_data: {
      verifyLink: `https://calebukle.com/verify/${token}`
    },
  };


  // return true
  return sg.send(msg);
}
