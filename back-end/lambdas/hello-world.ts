// Lambda function code

module.exports.handler = async (event, context) => {
  try {
    console.log("Event: ", event);
    let responseMessage = "Hello, World!";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: responseMessage,
        event: event,
        context: context,
      }),
    };
  } catch (e) {
    console.log("problem:", e);
  }
};
