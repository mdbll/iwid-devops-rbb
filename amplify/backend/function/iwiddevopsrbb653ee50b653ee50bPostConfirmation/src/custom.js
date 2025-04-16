const { InvokeCommand, LambdaClient } = require("@aws-sdk/client-lambda");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event, context) => {
  console.log({ event }, event.request, event.request.userAttributes);
  if (event.triggerSource == "PostConfirmation_ConfirmSignUp") {
    const userId = event.userName;
    let { name, family_name, email, sub } = event.request.userAttributes;

    family_name =
      family_name.charAt(0).toUpperCase() +
      family_name.substring(1).toLowerCase();

    name = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();

    console.log("env", process.env.FUNCTION_INSERTUSER_NAME);
    const cmd = new InvokeCommand({
      FunctionName: process.env.FUNCTION_INSERTUSER_NAME,
      InvocationType: "Event",
      Payload: JSON.stringify({ userId, email, name, family_name, id: sub }),
    });
    const client = new LambdaClient({});
    await client.send(cmd);
  }
  return event;
};
