import test from 'ava';
import sinon from 'sinon';
import rp from 'request-promise';

import { handler } from './index';
import CoffeeLocations from './coffee-locations';

let sandbox;

test.beforeEach(() => {
  sandbox = sinon.sandbox.create();
});

test.afterEach(() => {
  sandbox.restore();
});

/**
 * Promisifyies lambda callbacks.
 *
 * @param {Function} lambdaHandler lambda handler.
 * @param {Object} event Lambda event data
 * @return {Promise} Resolves any response from the lambda function that wasn't a complete error.
 */
const promisifyHandler = (lambdaHandler, event) => {
  return new Promise((resolve, reject) => {
    lambdaHandler(event, {}, (error, data) => {
      if (error) return reject(error);
      if (data) return resolve(data);
    });
  });
};

const validRequestBody = {
  latitude: 1,
  longitude: 1,
};

test('Handler > returns a bad request error when the client json was invalid', async (t) => {
  const response = await promisifyHandler(handler, { body: '{sss}' });
  t.is(response.statusCode, 400);
});

test('Handler > returns a client error when latitude or longitude was missing', async (t) => {
  const body = {
    latitude: 1,
  };

  const response = await promisifyHandler(handler, { body: JSON.stringify(body) });
  t.is(response.statusCode, 400);
});

test('Handler > returns a internal server error if an unknown error was thrown', async (t) => {
  sandbox.stub(CoffeeLocations.prototype, 'getLocations').callsFake(() => {
    throw new Error('I am unknown');
  });

  const response = await promisifyHandler(handler, { body: JSON.stringify(validRequestBody) });
  t.is(response.statusCode, 500);
});

test('Handler > returns a success response containing the locations', async (t) => {
  sandbox.stub(CoffeeLocations.prototype, 'getLocations').callsFake(() => []);

  const response = await promisifyHandler(handler, { body: JSON.stringify(validRequestBody) });
  t.is(response.statusCode, 200);
  const body = JSON.parse(response.body);
  t.true(Array.isArray(body.results)); // Testing of location structure is handled by coffee-locations
});

