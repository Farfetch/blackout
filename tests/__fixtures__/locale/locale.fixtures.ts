export const mockCountryCode = 'US';
export const mockStateId = 3;
export const mockQuery = { pageIndex: 1, pageSize: 4 };
export const isoCode = 'PT';

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

export const mockGetAddressSchemaResponse = {
  addressSchemaLines: [
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'FirstName',
      position: 0,
      type: 'FreeText',
      validationRegex: '^.{1,45}$',
      apiMapping: 'FirstName',
      isMandatory: true,
      maxLength: 45,
      minLength: 1,
      column: 0,
      row: 0,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'LastName',
      position: 0,
      type: 'FreeText',
      validationRegex: '^.{1,45}$',
      apiMapping: 'LastName',
      isMandatory: true,
      maxLength: 45,
      minLength: 1,
      column: 1,
      row: 0,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'StreetLine1',
      position: 1,
      type: 'FreeText',
      validationRegex: '^.{1,250}$',
      apiMapping: 'AddressLine1',
      isMandatory: true,
      maxLength: 250,
      minLength: 1,
      column: 0,
      row: 1,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'StreetLine2',
      position: 2,
      type: 'FreeText',
      validationRegex: '^.{0,500}$',
      apiMapping: 'AddressLine2',
      isMandatory: false,
      maxLength: 500,
      minLength: 0,
      column: 0,
      row: 2,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'StreetLine3',
      position: 3,
      type: 'FreeText',
      validationRegex: '^.{0,250}$',
      apiMapping: 'AddressLine3',
      isMandatory: false,
      maxLength: 250,
      minLength: 0,
      column: 0,
      row: 3,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'AdministrativeArea',
      position: 4,
      type: 'FreeText',
      validationRegex: '^.{1,150}$',
      apiMapping: 'City',
      isMandatory: true,
      maxLength: 150,
      minLength: 1,
      column: 0,
      row: 4,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'Municipality',
      position: 4,
      type: 'FreeText',
      validationRegex: '^.{0,150}$',
      apiMapping: 'State',
      isMandatory: false,
      maxLength: 150,
      minLength: 0,
      column: 1,
      row: 4,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'PostalCode',
      position: 5,
      type: 'FreeText',
      validationRegex: '^.{1,50}$',
      apiMapping: 'ZipCode',
      isMandatory: true,
      maxLength: 50,
      minLength: 1,
      column: 0,
      row: 5,
    },
    {
      id: '9a24c613-18c5-4b0d-a789-d79369777262',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'Phone',
      position: 5,
      type: 'PhoneNumber',
      validationRegex:
        '^(?=.{1,50}$)^(?!.*([\\s\\+\\-\\#\\*\\.\\(\\)\\[\\]])\\1)([\\d\\s\\+\\-\\#\\*\\.\\(\\)\\[\\]])+$',
      apiMapping: 'Phone',
      isMandatory: true,
      maxLength: 50,
      minLength: 1,
      column: 1,
      row: 5,
    },
  ],
  addressType: 'any',
};

export const expectedGetAddressSchemaNormalizedPayload = {
  entities: {
    addressSchema: {
      [isoCode]: {
        ...mockGetAddressSchemaResponse,
      },
    },
  },
  result: isoCode,
};
