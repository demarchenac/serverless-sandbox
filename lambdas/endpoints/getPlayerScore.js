const Responses = require("../common/apiResponses");
const Dynamo = require("../common/dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("event", event);

  if (
    !event.pathParameters ||
    (event.pathParameters && !event.pathParameters.ID)
  ) {
    return Responses._400({ message: "Missing ID" });
  }

  const { ID } = event.pathParameters;

  const user = await Dynamo.get(ID, tableName).catch((error) => {
    console.log("Error in DynamoDB Query", error);
    return null;
  });

  if (!user) {
    return Responses._404({ message: "User not found!" });
  }

  return Responses._200(user);
};
