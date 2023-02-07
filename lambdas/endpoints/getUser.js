const Responses = require("../common/apiResponses");

const data = {
  1234: { name: "anna jones", age: 25, job: "journalist" },
  7893: { name: "chris smith", age: 52, job: "teacher" },
  5132: { name: "tom hague", age: 23, job: "plasterer" },
};

exports.handler = async (event) => {
  console.log("event", event);

  if (
    !event.pathParameters ||
    (event.pathParameters && !event.pathParameters.ID)
  ) {
    return Responses._400({ message: "Missing ID" });
  }

  const { ID } = event.pathParameters;

  if (!data[ID]) {
    return Responses._400({ message: "ID wasn't found!" });
  }

  return Responses._200(data[ID]);
};
