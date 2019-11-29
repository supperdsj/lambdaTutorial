const moment = require('moment');

const greeting = {
  "en": "hello",
  "fr": "banjour",
  "hi": "namaste",
  "es": "hola"
};

exports.handler = async (event) => {
  let {name} = event.pathParameters;
  let {lang, ...info} = event.queryStringParameters || {};

  let message = `${greeting[lang] ? greeting[lang] : greeting['en']} ${name}`;
  let response = {message, info, timestamp: moment().unix()};

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(response)
  };
};
