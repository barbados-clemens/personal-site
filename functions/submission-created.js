exports.handler = async function (event, context, callback) {
  // TODO handle different form submissions
  const body = JSON.parse(event.body);
  console.log(body, null, 2)
  const email = 'test.user@email.com';

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      body: JSON.stringify({email})
    }
  })
}
