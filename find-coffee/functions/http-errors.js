class BadGatewayError extends Error {
  constructor (message = 'Bad Gateway') {
    super(...arguments);
    this.httpStatus = 502
  }
}

class BadRequestError extends Error {
  constructor (message = 'Bad Request') {
    super(...arguments);
    this.httpStatus = 400
  }
}

class InternalServerError extends Error {
  constructor (message = 'Internal Server Error') {
    super(...arguments);
    this.httpStatus = 500
  }
}

export { BadGatewayError, BadRequestError, InternalServerError };
