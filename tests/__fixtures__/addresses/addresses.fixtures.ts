export const addressId = '1234';
export const addressId2 = '2222222';
export const addressId3 = '33333333';
export const userId = 123456;
export const isoCode = 'PT';

export const mockPredictionDetailsResponse = {
  streetName: 'sesame street',
  buildingNumber: '12',
  addressLine1: 'sesame street 12',
  addressLine2: 'apartment 12 ',
  districtName: 'sesame district',
  cityName: 'sesame',
  provinceName: 'sesame province',
  postalCode: '12',
  countryName: 'sesame',
};

export const mockPredictionResponse = {
  id: 'EiZSdWEgZGUgU2FudGEgQ2F0YXJpbmEsIFBvcnRvLCBQb3J0dWdhbCIuKiwKFAoSCVHmX236ZCQNEWtKUad5WOBGEhQKEgnBU-HEq2UkDRG8FLFAVtlIpg',
  text: 'Rua de Santa Catarina',
  description: 'Rua de Santa Catarina, Porto, Portugal',
  type: 'Address',
};
export const mockPredictionResponse2 = {
  id: 'Eh1SdWEgQXVndXN0YSwgTGlzYm9uLCBQb3J0dWdhbCIuKiwKFAoSCekeywN5NBkNEZNNGdb_qy0_EhQKEgk78-RhGjMZDRHQNpDkvesABA',
  text: 'Rua Augusta',
  description: 'Rua Augusta, Lisbon, Portugal',
  type: 'Address',
};

export const mockPredictionsResponse = [
  mockPredictionResponse,
  mockPredictionResponse2,
];

export const mockPostAddressResponse = {
  addressLine1: 'addres 1',
  addressLine2: null,
  addressLine3: null,
  city: { countryId: 0, id: 0, name: 'portugal', stateId: null },
  country: {
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    region: 'Europe',
    subRegion: '',
    regionId: 0,
    subfolder: '/en-pt',
    continentId: 3,
  },
  ddd: null,
  title: null,
  firstName: 'first name',
  id: addressId,
  lastName: 'last name',
  neighbourhood: null,
  phone: '919191919',
  state: { code: null, countryId: 0, id: 0, name: null },
  vatNumber: null,
  zipCode: '4100-100',
  userId: 0,
  isCurrentBilling: false,
  isCurrentShipping: false,
  isCurrentPreferred: false,
};

export const mockUpdateAddressResponse = {
  addressLine1: 'addres 1',
  addressLine2: null,
  addressLine3: null,
  city: { countryId: 0, id: 0, name: 'portugal', stateId: null },
  country: {
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    region: 'Europe',
    subRegion: '',
    regionId: 0,
    subfolder: '/en-pt',
    continentId: 3,
  },
  ddd: null,
  title: null,
  firstName: 'first name',
  id: addressId,
  lastName: 'last name',
  neighbourhood: null,
  phone: '919191919',
  state: { code: null, countryId: 0, id: 0, name: null },
  vatNumber: null,
  zipCode: '4100-100',
  userId: 0,
  isCurrentBilling: false,
  isCurrentShipping: false,
  isCurrentPreferred: false,
};

export const address1 = {
  id: addressId,
  firstName: 'tiago3443',
  lastName: 'ultimo4343',
  addressLine1: 'Rua António Gago A',
  addressLine2: 'São Gonçalo de Lagos',
  addressLine3: 'A',
  city: {
    id: 0,
    name: 'Lagos',
    countryId: 0,
  },
  state: {
    id: 0,
    name: 'Faro',
    countryId: 0,
  },
  country: {
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    region: 'Europe',
    continentId: 3,
  },
  zipCode: '8600',
  phone: '434343434',
  addressType: 0,
  isCurrentShipping: true,
  isCurrentBilling: true,
  isCurrentPreferred: false,
  createdDate: '2021-03-31T08:45:41.307Z',
  updatedDate: '2021-11-03T17:24:48.37Z',
};

export const address2 = {
  id: addressId2,
  firstName: 'testing',
  lastName: 'testing',
  addressLine1: 'Caminho Municipal 1267 1',
  addressLine2: 'Balança',
  city: {
    id: 0,
    name: 'Terras de Bouro',
    countryId: 0,
  },
  state: {
    id: 0,
    name: 'Braga',
    countryId: 0,
  },
  country: {
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    region: 'Europe',
    continentId: 3,
  },
  zipCode: '4840-010',
  phone: '969696969',
  addressType: 0,
  isCurrentShipping: false,
  isCurrentBilling: false,
  isCurrentPreferred: false,
  createdDate: '2021-11-03T16:46:17.584Z',
  updatedDate: '2021-11-04T10:13:44.782Z',
};

export const address3 = {
  id: addressId3,
  firstName: 'testing',
  lastName: 'testing',
  addressLine1: 'Caminho Municipal 1267 1',
  addressLine2: 'Balança',
  city: {
    id: 0,
    name: 'Terras de Bouro',
    countryId: 0,
  },
  state: {
    id: 0,
    name: 'Braga',
    countryId: 0,
  },
  country: {
    id: 165,
    name: 'Portugal',
    nativeName: 'Portugal',
    alpha2Code: 'PT',
    alpha3Code: 'PRT',
    culture: 'pt-PT',
    region: 'Europe',
    continentId: 3,
  },
  zipCode: '4840-010',
  phone: '969696969',
  addressType: 0,
  isCurrentShipping: false,
  isCurrentBilling: false,
  isCurrentPreferred: false,
  createdDate: '2021-11-03T16:46:17.584Z',
  updatedDate: '2021-11-04T10:13:44.782Z',
};

export const mockGetAddressResponse = address1;

export const mockGetAddressesResponse = [address2, address3];

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

export const expectedPostAddressNormalizedPayload = {
  entities: {
    addresses: {
      [addressId]: {
        ...mockPostAddressResponse,
      },
    },
  },
  result: addressId,
};

export const expectedGetAddressNormalizedPayload = {
  entities: {
    addresses: {
      [addressId]: {
        ...mockGetAddressResponse,
      },
    },
  },
  result: addressId,
};

export const expectedGetAddressesNormalizedPayload = {
  entities: {
    addresses: {
      [addressId2]: {
        ...mockGetAddressesResponse[0],
      },
      [addressId3]: {
        ...mockGetAddressesResponse[1],
      },
    },
  },
  result: [addressId2, addressId3],
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

export const expectedUpdateAddressNormalizedPayload = {
  entities: {
    addresses: {
      [addressId]: {
        ...mockUpdateAddressResponse,
      },
    },
  },
  result: addressId,
};

export const mockInitialState = {
  addresses: {
    error: null,
    isLoading: false,
    result: null,
    predictions: {
      result: null,
      error: null,
      isLoading: false,
    },
    predictionDetails: {
      result: null,
      error: null,
      isLoading: false,
    },
    addresses: {
      error: null,
      isLoading: false,
    },
    address: {
      error: {},
      isLoading: {},
    },
    addressSchema: {
      error: null,
      isLoading: false,
    },
    defaultAddressDetails: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  entities: {
    addresses: {},
    addressSchema: {},
  },
};

export const mockLoadingState = {
  addresses: {
    error: null,
    isLoading: true,
    result: null,
    predictions: {
      result: null,
      error: null,
      isLoading: true,
    },
    predictionDetails: {
      result: null,
      error: null,
      isLoading: true,
    },
    addresses: {
      error: null,
      isLoading: false,
    },
    address: {
      error: {},
      isLoading: {
        [addressId]: true,
      },
    },
    addressSchema: {
      error: null,
      isLoading: false,
    },
    defaultAddressDetails: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  entities: {
    addresses: {},
    addressSchema: {},
  },
};

export const mockErrorState = {
  addresses: {
    error: 'Error',
    isLoading: false,
    result: null,
    predictions: {
      result: null,
      error: 'Error',
      isLoading: false,
    },
    predictionDetails: {
      result: null,
      error: 'Error',
      isLoading: false,
    },
    addresses: {
      error: null,
      isLoading: false,
    },
    address: {
      error: {
        [addressId]: 'Error',
      },
      isLoading: {},
    },
    addressSchema: {
      error: null,
      isLoading: false,
    },
    defaultAddressDetails: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  entities: {
    addresses: {},
    addressSchema: {},
  },
};

export const mockCurrentState = {
  addresses: {
    error: null,
    isLoading: false,
    result: expectedGetAddressesNormalizedPayload.result,
    predictions: {
      result: null,
      error: null,
      isLoading: false,
    },
    predictionDetails: {
      result: null,
      error: null,
      isLoading: false,
    },
    addresses: {
      error: null,
      isLoading: false,
    },
    address: {
      error: {},
      isLoading: {
        [addressId2]: false,
        [addressId3]: false,
      },
    },
    addressSchema: {
      error: null,
      isLoading: false,
    },
    defaultAddressDetails: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  entities: {
    addresses: {
      ...expectedGetAddressesNormalizedPayload['entities'].addresses,
    },
    addressSchema: {
      ...expectedGetAddressSchemaNormalizedPayload['entities'].addressSchema,
    },
  },
};
