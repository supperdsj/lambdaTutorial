exports.handler = async (event, context) => {
  let log = event;
  log.lambdaFunction = context.functionName;
  log.lambdaVersion = context.functionVersion;
  return log;
};
let sm={
  "Comment": "A Hello World example of the Amazon States Language using Pass states",
  "StartAt": "Hello",
  "States": {
    "WaitForSometime":{
      "Comment":"wait state",
      "type":"Wait",
      "Seconds":5,
      "Next":"Hello",
    },
    "Hello": {
      "Type": "Pass",
      "Result": "Hello",
      "Next": "World"
    },
    "World": {
      "Type": "Pass",
      "Result": "World",
      "End": true
    }
  }
}
