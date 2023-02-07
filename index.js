module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "demarchenac lambda @ serverless v3",
        input: event,
      },
      null,
      2
    ),
  };
};
