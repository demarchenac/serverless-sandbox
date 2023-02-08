const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});

const documentClientOptions = {
  marshallOptions: {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  },
  unmarshallOptions: {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
  },
};

const documentClient = DynamoDBDocumentClient.from(
  client,
  documentClientOptions
);

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.send(new GetCommand(params));

    if (!data || (data && !data.Item)) {
      throw Error(
        `There was an error fetching the data for ID (${ID}) from ${TableName}`
      );
    }

    console.log(data);

    return data.Item;
  },

  async put(data, TableName) {
    if (!data || (data && !data.ID)) {
      throw Error(`Data is missing the ID property`);
    }

    const params = {
      TableName,
      Item: data,
    };

    const response = await documentClient.send(new PutCommand(params));

    if (!response) {
      throw Error(
        `There was an error inserting ID (${ID}) in table ${TableName}`
      );
    }

    return data;
  },

  async delete(ID, TableName) {
    if (!ID) {
      throw Error(`Missing the ID property`);
    }

    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.send(new GetCommand(params));

    if (!data || (data && !data.Item))
      throw new Error(`User with ID (${ID}) does not exists on ${TableName}`);

    const response = await documentClient.send(new DeleteCommand(params));

    if (!response) {
      throw Error(
        `There was an error deleting ID (${ID}) in table ${TableName}`
      );
    }

    return data.Item;
  },
};

module.exports = Dynamo;
