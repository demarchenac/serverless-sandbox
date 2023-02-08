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

  const payload = JSON.parse(event.body);
  payload.ID = ID;

  const user = await Dynamo.put(payload, tableName).catch((error) => {
    console.log("Error in DynamoDB Put", error);
    return null;
  });

  if (!user) {
    return Responses._409({ message: "Id already exists!" });
  }

  return Responses._200(user);
};
