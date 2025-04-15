const { InvokeCommand, LambdaClient } = require("@aws-sdk/client-lambda");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log({ event }, "dsfsdfsdfs");
  if (event.triggerSource == "PostConfirmation_ConfirmSignUp") {
    const userId = event.userName ?? event.userId;
    const email = event.requestContext.userAttributes.email;

    const lambdaParams = {
      FunctionName: process.env.FUNCTION_INSER_USER,
      InvocationType: "Event",
      Payload: json.stringify({ userId, email }),
    };

    const cmd = new InvokeCommand(lambdaParams);
    await LambdaClient.send(cmd);
  }
  return event;
};
