// Utility function to send a standardized JSON response
module.exports.responseReturn = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};
