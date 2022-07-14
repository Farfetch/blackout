import { mockModel } from 'tests/__fixtures__/locale';
import { localeServerInitialState as serverInitialState } from '..';

describe('local serverInitialState()', () => {
  it('should initialize server state for the locale', () => {
    const model = mockModel;
    const state = serverInitialState({ model });

    expect(state).toEqual({
      locale: {
        countryCode: 'US',
        sourceCountryCode: 'PT',
      },
      entities: {
        countries: {
          US: {
            platformId: 216,
            cultures: ['en-US'],
            currencies: [
              {
                cultureCode: 'en-US',
                isoCode: 'USD',
              },
            ],
            code: 'US',
            newsletterSubscriptionOptionDefault: false,
            defaultSubfolder: '/en-us',
            defaultCulture: 'en-US',
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
        sourceCountryCode: null,
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
        addressSchema: {
          error: null,
          isLoading: false,
        },
      },
    });
  });
});
