const mail = require("@sendgrid/mail")
require("dotenv").config()

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)

  mail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: body.to,
    from: "hey@calebukle.com",
    templateId: "d-d3d4baf5e70b4ec89047613e486ace88",
    dynamic_template_data: {
      blogPosts: [
        {
          title: "First Blog",
          url: "/blog/1",
          desc:
            "this is a long group of test to talk a bit about wha tht post is supposed to be about. I'm not sure if this will be too long, but a ocuple of sentences is typically the best length. or maybe not.",
        },
        {
          title: "second Blog",
          url: "/blog/2",
          desc:
            "this is a long group of test to talk a bit about wha tht post is supposed to be about. I'm not sure if this will be too long, but a ocuple of sentences is typically the best length. or maybe not.",
        },
      ],
      multiPost: true,
    },
  }

  mail
    .send(msg)
    .then(_ => console.log("success"))
    .catch(err => {
      console.error(JSON.stringify(err))
      return Promise.reject(err);
    });
}
