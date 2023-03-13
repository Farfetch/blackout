import { mockModel } from 'tests/__fixtures__/locale';
import serverInitialState from '../serverInitialState';
import type { Model } from '../../types';

describe('local serverInitialState()', () => {
  it('should initialize server state for the locale', () => {
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = mockModel as Model;
    const state = serverInitialState({ model });

    expect(state).toEqual({
      locale: {
        countryCode: 'US',
        sourceCountryCode: 'PT',
        subfolder: '/en-us',
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
    const model = {} as Model;
    const state = serverInitialState({ model });

    expect(state).toEqual({
      locale: {
        countryCode: '',
        sourceCountryCode: null,
        subfolder: null,
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
        countriesAddressSchemas: {
          error: null,
          isLoading: false,
        },
      },
    });
  });
});
