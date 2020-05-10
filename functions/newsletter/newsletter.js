const {sendEmail, generateToken} = require("./email");
const {markUserAsVerified, saveToDb} = require("./db")


const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': 'https://calebukle.com',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST,'
}


const verifyPayload = (payload) => {

  let message;
  let statusCode = 200


  if (!payload.hasOwnProperty('type')) {
    message = {error: 'missing type'};
    statusCode = 400;
  }

  if (
    !payload.hasOwnProperty('email') ||
    !payload.hasOwnProperty('bot') ||
    !payload.hasOwnProperty('signUpPage') ||
    !payload.hasOwnProperty('token')
  ) {
    message = {error: 'Invalid config', payload};
    statusCode = 400;
  }

  if (payload.bot) {
    message = {error: 'bot detected', isBot: true}
    statusCode = 400
  }

  return {
    message,
    statusCode,
  }
}


/**
 *
 * @param {Object} payload
 * @return {Promise<boolean>}
 */
const signUpUser = async (payload) => {
  const token = await generateToken(payload.email);
  console.log('doc id', token)

  const dbInfo = {...payload, token};
  console.log(dbInfo)
  await saveToDb(dbInfo)

  return sendEmail(payload.email, token);
}

exports.handler = async function (event, context, callback) {
  try {

    if (event.httpMethod !== 'POST') {
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({error: 'invalid HTTP verb', verb: event.httpMethod})
      })
    }
    const payload = JSON.parse(event.body);

    const {statusCode, message} = verifyPayload(payload);

    if (statusCode !== 200) {
      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify(message)
      })
    }


    switch (payload.type) {
      case 'signup':
        await signUpUser(payload);
        break;
      case 'check':
        await markUserAsVerified(payload.token);
        break;
      default:
        callback(null, {
          statusCode: 400,
          headers,
          body: JSON.stringify({error: `unknown type: ${payload.type}`})
        })
        break;

    }

    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({success: `Thank you! Check your email, ${payload.email}, for a verification link`})
    })
  } catch (e) {
    callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({error: 'Unknown error', ...e})
    })
  }
}

