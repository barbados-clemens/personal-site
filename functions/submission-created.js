import {APIGatewayProxyCallback, APIGatewayProxyEvent} from '@types/aws-lambda'


/**
 *
 * @param {APIGatewayProxyEvent} event
 * @param {any} context
 * @param {APIGatewayProxyCallback} callback
 * @returns {Promise<void>}
 */
exports.handler = async function (event, context, callback) {

  console.log(JSON.stringify(context))


  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })

}
