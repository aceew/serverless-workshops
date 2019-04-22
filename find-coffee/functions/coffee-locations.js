import { BadGatewayError, BadRequestError } from './http-errors'
import rp from 'request-promise';

const API_URL = process.env.MAPS_API_URL;
const API_KEY = process.env.MAPS_API_KEY;

export default class CoffeeLocations {
  /**
   * Handler of coffee shop locations
   * @param {Number} latitude
   * @param {Number} longitude
   * @param {Number} [radius=50]
   */
  constructor (latitude, longitude, radius = 50) {
    if (!latitude || !longitude) {
      throw new BadRequestError('Latitude and longitude must be provided');
    }

    this.currentLocation = {
      latitude,
      longitude
    };

    this.radius = radius;
    this.locations = [];
  }

  /**
   * Gets locations from the google API.
   */
  async getLocations () {
    if (!API_URL || !API_KEY) {
      console.error('Missing API_URL or API_KEY');
      throw new BadGatewayError();
    }

    // We could do some proper request mapping here but
    const response = await rp(`${API_URL}?key=${API_KEY}&location=${this.currentLocation.latitude},${this.currentLocation.longitude}&radius=${this.radius}&keyword=coffee`);
    this.locations = response.results.map((location) => {
      return {
        name: location.name,
        open: location.opening_hours.open_now,
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
      };
    });
  }
}
