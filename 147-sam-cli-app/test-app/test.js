const AWS = require('aws-sdk');
AWS.config.update({region: 'cn-northwest-1'});

const lambda = new AWS.Lambda({
  endpoint: 'http://127.0.0.1:3001/'
});

let params = {
  FunctionName: 'HelloWorldFunction',
  Payload: new Buffer('{}')
};
lambda.invoke(params, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
