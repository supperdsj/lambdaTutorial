exports.handler = async (event) => {
  let eventJSON=JSON.stringify(event);
  console.log(eventJSON);

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
};
