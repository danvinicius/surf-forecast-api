import { StormGlass } from '@src/clients/stormglass';
import stormGlassNormalizedResponse3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';
import { Forecast } from '@src/services/forecast';
import { Beach, BeachPosition } from '@src/models/beach';

jest.mock('@src/clients/stormglass');

describe('Forecast Service', () => {
  const mockedStormGlassService = new StormGlass() as jest.Mocked<StormGlass>;
  it('should return the forecast for a list of beaches', async () => {
    mockedStormGlassService.fetchPoints.mockResolvedValue(
      stormGlassNormalizedResponse3HoursFixture
    );

    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E
      },
    ];

    const expectedResponse = [
      {
        time: '2024-04-01T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            time: '2024-04-01T00:00:00+00:00',
            rating: 1,
            swellDirection: 228.46,
            swellHeight: 0.2,
            swellPeriod: 19.14,
            waveDirection: 247.17,
            waveHeight: 5.84,
            windDirection: 290.63,
            windSpeed: 14.0,
          },
        ],
      },
      {
        time: '2024-04-01T01:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            time: '2024-04-01T01:00:00+00:00',
            rating: 1,
            swellDirection: 229.71,
            swellHeight: 0.18,
            swellPeriod: 18.78,
            waveDirection: 249.6,
            waveHeight: 5.87,
            windDirection: 282.71,
            windSpeed: 14.0,
          },
        ],
      },
      {
        time: '2024-04-01T02:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            time: '2024-04-01T02:00:00+00:00',
            rating: 1,
            swellDirection: 230.97,
            swellHeight: 0.15,
            swellPeriod: 18.43,
            waveDirection: 252.03,
            waveHeight: 5.89,
            windDirection: 274.8,
            windSpeed: 14.0,
          },
        ],
      },
    ];

    const forecast = new Forecast(mockedStormGlassService);
    const beachesWithRating = await forecast.processForecastForBeaches(beaches);
    expect(beachesWithRating).toEqual(expectedResponse);
  });

  it('should return an empty list when beaches array is empty', async () => {
    const forecast = new Forecast();
    const response = await forecast.processForecastForBeaches([]);
    expect(response).toEqual([]);
  });

  it('should throw internal processing error when something goes wrong during the rating process', async () => {
    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E
      },
    ];

    mockedStormGlassService.fetchPoints.mockRejectedValue('Error fetching data');

    const forecast = new Forecast(mockedStormGlassService);
    await expect(forecast.processForecastForBeaches(beaches)).rejects.toThrow(Error)
  });
});
