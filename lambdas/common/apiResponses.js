const sharedHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Origin": "*",
};

const Responses = {
  _200(data = {}) {
    return {
      headers: { ...sharedHeaders },
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
  _400(data = {}) {
    return {
      headers: { ...sharedHeaders },
      statusCode: 400,
      body: JSON.stringify(data),
    };
  },
  _404(data = {}) {
    return {
      headers: { ...sharedHeaders },
      statusCode: 404,
      body: JSON.stringify(data),
    };
  },
  _409(data = {}) {
    return {
      headers: { ...sharedHeaders },
      statusCode: 409,
      body: JSON.stringify(data),
    };
  },
};

module.exports = Responses;
