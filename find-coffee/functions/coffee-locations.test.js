import test from 'ava';
import sinon from 'sinon';
import rp from 'request-promise';
import { BadGatewayError, BadRequestError } from './http-errors'

import CoffeeLocations from './coffee-locations';

test('Creating the locations class > Throws an error when lat or long is missing', (t) => {
  let locations;

  try {
    locations = new CoffeeLocations();
  } catch (error) {
    t.true(error instanceof BadRequestError);
    t.is(locations, undefined);
  }
});

test('Getting locations > Returns an array of locations and sets them on the class', async (t) => {
  const locations = new CoffeeLocations(52.476172, -1.899346);
  await locations.getLocations();
  // console.error('WE CARE ', locations);
});

test('Getting locations > Throws an error when the api env is missing', async (t) => {
  const locations = new CoffeeLocations(1, 3);
  try {
    await locations.getLocations();
  } catch (error) {
    t.true(error instanceof BadGatewayError);
  }
});
