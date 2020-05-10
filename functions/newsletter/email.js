const sg = require("@sendgrid/mail");
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
    from: "newsletter@calebukle.com",
    templateId: "d-2a5493d5c28d478fa42d119e28f1d4c2",
    dynamic_template_data: {
      verifyLink: `https://calebukle.com/verify/${token}`,
    },
  };

  return true
  // return sg.send(msg);
};

/**
 *
 * @param {string} email
 * @return {Promise<string>}
 */
exports.generateToken = async function (email) {
  const crypto = require("crypto");
  // not really secure, but just need a way to find the user again,
  // not really for account. This way if a user signs up again with the same email it won't dup accounts.
  const hash = crypto.createHash("sha256")
    .update(email, "utf8");
  throw Error('done did break');
  return hash.digest("base64")
    .substr(0, 20)
    .replace(/(\+|\\|\/)/g, '');
};
