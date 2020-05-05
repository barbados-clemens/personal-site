/**
 *
 * @param {APIGatewayProxyEvent} event
 * @param {any} context
 * @param {APIGatewayProxyCallback} callback
 * @returns {Promise<void>}
 */
exports.handler = async function (event, context, callback) {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({error: 'Invalid request', method: event.httpMethod})
    })
  }

  const {payload} = JSON.parse(event.body);

  let res = {};
  let statusCode = 200;

  switch (payload.form_name) {
    case 'contact':
      console.log('Contact form submission detected. Doing nothing for now.')
      res = {msg: 'new contact submission'}
      break;

    case 'newsletter':
      console.log('Newsletter form submission detected. Adding to email list')
      res = {msg: `TODO add ${payload.data.email} to email list`}
      break;
    default:
      console.log(`unknown form name ${payload.form_name}`)
  }

  callback(null, {
    statusCode,
    headers,
    body: JSON.stringify(res)
  })
}
