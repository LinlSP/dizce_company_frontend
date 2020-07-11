const statusMessages = {
  "200": "Done",
  "201": "Created",
  "400": "Invalid format",
  "500": "Internal error, go to the console",
};

exports.success = function (req, res, message, status = 200) {
  if (!message) {
    message = statusMessages[status];
  }

  res.status(status).send({
    response: message,
  });
};

exports.error = function (req, res, error, status = 500) {
  if (!error) {
    error = statusMessages[status];
  }
  res.status(status).send({
    error: error,
  });
};
