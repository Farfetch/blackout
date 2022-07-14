export const addressId = '1234';
export const addressId2 = '2222222';
export const addressId3 = '33333333';
export const userId = 123456;

export const mockAddressPredictionResponse = {
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

export const mockAddressPredictionsResponse = [
  mockPredictionResponse,
  mockPredictionResponse2,
];

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
    prediction: {
      result: null,
      error: null,
      isLoading: false,
    },
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
    prediction: {
      result: null,
      error: null,
      isLoading: true,
    },
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
    prediction: {
      result: null,
      error: 'Error',
      isLoading: false,
    },
  },
};

export const mockCurrentState = {
  addresses: {
    error: null,
    isLoading: false,
    predictions: {
      result: null,
      error: null,
      isLoading: false,
    },
    prediction: {
      result: null,
      error: null,
      isLoading: false,
    },
  },
};
