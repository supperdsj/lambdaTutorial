'use strict';
// sls create -t aws-nodejs -p hello-serverless
// sls invoke local -f hello -d '{"key":"value"}'
module.exports = {
  hello: async event => {
    return {
      statusCode: 200,
      body: JSON.stringify(
          {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
          },
          null,
          2
      ),
    }
  },
  add: async event => {
    let {num1, num2} = event;
    return {
      statusCode: 200,
      body: JSON.stringify(
          {
            num1, num2, result: num1 + num2
          },
          null,
          2
      ),
    }
  }
};
