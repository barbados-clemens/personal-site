const mail = require('@sendgrid/mail');
const firebase = require('firebase/app');

require("dotenv").config()

exports.handler = (event, context, callback) => {
 const body = JSON.parse(event.body);

 console.log(body);

  mail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: 'caleb.ukle@gmail.com',
    from: "hey@calebukle.com",
    templateId: "d-d2a15662396d4364b6c4782da6615fd9",
    dynamic_template_data: {

    },
  }

  mail.send(msg)
  .then(res => console.log('success'))
  .catch(err => console.error(err));
}
