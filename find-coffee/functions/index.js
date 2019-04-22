import rp from 'request-promise';
import { BadGatewayError, BadRequestError, InternalServerError } from './http-errors'
import CoffeeLocations from './coffee-locations';

const handler = async (event, context, callback) => {
  const response = {};

  try {
    const body = JSON.parse(event.body);
    const coffee = new CoffeeLocations(body.latitude, body.longitude);
    const locations = coffee.getLocations();
    response.body = { results: locations };
    response.statusCode = 200;
  } catch (error) {
    if (error.name === 'SyntaxError') error = new BadRequestError('Invalid json in response body');

    if (!error.httpStatus) {
      // Useful for debugging. We could use this to alert on edge cases.
      console.error(error);
      error = new InternalServerError();
    }

    response.statusCode = error.httpStatus;
    response.body = { message: error.message };
  }

  response.body = JSON.stringify(response.body);
  response.headers = {};

  return callback(undefined, response);
};

export { handler };
