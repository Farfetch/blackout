import { mockModel } from 'tests/__fixtures__/locale';
import { serverInitialState } from '..';

describe('local serverInitialState()', () => {
  it('should initialize server state for the locale', () => {
    const model = mockModel;
    const state = serverInitialState({ model });

    expect(state).toEqual({
      locale: {
        countryCode: 'US',
      },
      entities: {
        countries: {
          US: {
            platformId: 216,
            cultureCode: 'en-US',
            currencies: [
              {
                cultureCode: 'en-US',
                isoCode: 'USD',
              },
            ],
            code: 'US',
            newsletterSubscriptionOptionDefault: false,
            structure: '/en-us',
            sourceCountryCode: 'PT',
          },
        },
      },
    });
  });

  it('should initialise server state', () => {
    const model = {};
    const state = serverInitialState({ model });

    expect(state).toEqual({
      locale: {
        countryCode: null,
        cities: {
          error: null,
          isLoading: false,
        },
        countries: {
          error: null,
          isLoading: false,
        },
        currencies: {
          error: null,
          isLoading: false,
        },
        states: {
          error: null,
          isLoading: false,
        },
      },
    });
  });
});
