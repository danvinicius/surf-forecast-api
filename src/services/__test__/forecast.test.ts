import { StormGlass } from '@src/clients/stormglass';
import stormGlassNormalizedResponse3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import { Beach, BeachPosition, Forecast } from '@src/services/forecast';

jest.mock('@src/clients/stormglass');

describe('Forecast Service', () => {
  it('should return the forecast for a list of beaches', async () => {
    StormGlass.prototype.fetchPoints = jest
      .fn()
      .mockResolvedValue(stormGlassNormalizedResponse3HoursFixture);

    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        user: 'some-id',
      },
    ];

    const expectedResponse = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
        rating: 1,
        swellDirection: 228.46,
        swellHeight: 0.2,
        swellPeriod: 19.14,
        time: '2024-04-01T00:00:00+00:00',
        waveDirection: 247.17,
        waveHeight: 5.84,
        windDirection: 290.63,
        windSpeed: 14.0,
      },
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
        rating: 1,
        swellDirection: 229.71,
        swellHeight: 0.18,
        swellPeriod: 18.78,
        time: '2024-04-01T01:00:00+00:00',
        waveDirection: 249.6,
        waveHeight: 5.87,
        windDirection: 282.71,
        windSpeed: 14.0,
      },
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
        rating: 1,
        swellDirection: 230.97,
        swellHeight: 0.15,
        swellPeriod: 18.43,
        time: '2024-04-01T02:00:00+00:00',
        waveDirection: 252.03,
        waveHeight: 5.89,
        windDirection: 274.8,
        windSpeed: 14.0,
      },
    ];

    const forecast = new Forecast(new StormGlass());
    const beachesWithRating = await forecast.processForecastForBeaches(beaches);
    expect(beachesWithRating).toEqual(expectedResponse);
  });
});
