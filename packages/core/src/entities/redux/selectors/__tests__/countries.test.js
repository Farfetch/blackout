import { getCountries, getCountry } from '..';

const mockCountryCode = 'AQ';
const mockCountry = {
  id: 'AQ',
  cultureCode: 'en-US',
  countryId: 7,
  isDefault: false,
  newsletterSubscriptionOptionDefault: true,
  isCountryDefault: false,
  currencies: [
    {
      id: 2,
      name: 'United States Dollar',
      isoCode: 'USD',
      cultureCode: 'en-US',
    },
  ],
};

describe('getCountry()', () => {
  it('should return the country entity', () => {
    const state = {
      entities: {
        countries: {
          [mockCountryCode]: mockCountry,
        },
      },
    };

    expect(getCountry(state, mockCountryCode)).toEqual(mockCountry);
  });
});

describe('getCountries()', () => {
  it('should return all the countries entities', () => {
    const state = {
      entities: {
        countries: {
          [mockCountryCode]: mockCountry,
        },
      },
    };

    expect(getCountries(state)).toEqual(state.entities.countries);
  });
});
