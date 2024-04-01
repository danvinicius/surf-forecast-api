import { StormGlass } from '@src/clients/stormglass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalizedResponse3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';

jest.mock('axios');

describe('StormGlass client', () => {
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.792112;
    const lng = 151.791042;

    axios.get = jest.fn().mockResolvedValue({data: stormGlassWeather3HoursFixture});

    const stormGlass = new StormGlass(axios);

    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormGlassNormalizedResponse3HoursFixture);
  });
});
