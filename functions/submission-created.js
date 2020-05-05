/**
 *
 * @param {APIGatewayProxyEvent} event
 * @param {any} context
 * @param {APIGatewayProxyCallback} callback
 * @returns {Promise<void>}
 */
exports.handler = async function (event, context, callback) {

  console.log(JSON.stringify(context, null, 2), JSON.stringify(event, null, 2))


  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })

}
