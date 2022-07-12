export const mockCountryCode = 'US';
export const mockStateId = 3;
export const mockQuery = { pageIndex: 1, pageSize: 4 };

export const mockCurrencies = [
  {
    id: 2,
    name: 'United States Dollar',
    isoCode: 'USD',
    cultureCode: 'en-US',
  },
];

export const mockCountry = {
  code: 'US',
  platformId: 216,
  cultures: ['en-US'],
  isDefault: true,
  newsletterSubscriptionOptionDefault: true,
  isCountryDefault: true,
  defaultCulture: 'en-US',
  defaultSubfolder: '/en-us',
  continentId: 5,
  currencies: mockCurrencies,
  structures: ['/en-us'],
};

export const mockCountryNormalized = {
  ...mockCountry,
  states: [3, 6],
};
export const mockCountries = [mockCountry];
export const mockCountriesEntities = {
  [mockCountry.code]: mockCountryNormalized,
};

export const mockCity = {
  id: 515,
  name: 'Atlanta',
  stateId: 17,
  countryId: 216,
};

export const mockCities = [
  {
    id: 516,
    name: 'Lisbon',
    stateId: 3,
    countryId: 216,
  },
  {
    id: 515,
    name: 'Atlanta',
    stateId: 6,
    countryId: 216,
  },
];
export const mockCitiesEntities = {
  516: mockCities[0],
  515: mockCities[1],
};

export const mockStates = [
  {
    code: 'AL',
    countryId: 216,
    id: 3,
    name: 'Alabama',
  },
  {
    code: 'AK',
    countryId: 216,
    id: 6,
    name: 'Alaska',
  },
];
export const mockStatesEntities = {
  3: { ...mockStates[0], cities: [mockCities[0]?.id] },
  6: { ...mockStates[1], cities: [mockCities[1]?.id] },
};
export const mockModel = {
  subfolder: '/en-us',
  currencyCode: 'USD',
  currencyCultureCode: 'en-US',
  countryCode: 'US',
  countryId: 216,
  cultureCode: 'en-US',
  newsletterSubscriptionOptionDefault: false,
  defaultCulture: 'en-US',
  defaultSubfolder: '/en-us',
  sourceCountryCode: 'PT',
};
