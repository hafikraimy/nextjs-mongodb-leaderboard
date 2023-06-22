const { StatusCodes } = require('http-status-codes');
const { default: CustomAPIError } = require('./custom-api');

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
