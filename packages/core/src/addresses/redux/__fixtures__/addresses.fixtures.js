export const addressId = '1234';
export const addressId2 = '2222222';
export const addressId3 = '33333333';
export const userId = '123456';
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

export const mockPredictionResponse = [
  {
    id: '123456789',
    text: 'sesame street',
    description: 'wow, such empty',
  },
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
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: false,
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
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: false,
};

export const mockGetAddressResponse = {
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
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: false,
};

export const mockGetAddressesResponse = [
  {
    addressLine1: 'addres 1',
    addressLine2: '',
    addressLine3: '',
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
    id: addressId2,
    lastName: 'last namer',
    neighbourhood: null,
    phone: '919191919',
    state: { code: null, countryId: 0, id: 0, name: '' },
    vatNumber: null,
    zipCode: '4100-100',
    userId: 0,
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: false,
  },
  {
    addressLine1: 'uyuytiuytiuy',
    addressLine2: '',
    addressLine3: '',
    city: {
      countryId: 0,
      id: 0,
      name: 'uy t',
      stateId: null,
    },
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
    firstName: 'Rafaell',
    id: addressId3,
    lastName: 'Mendes',
    neighbourhood: null,
    phone: '436543646',
    state: { code: null, countryId: 0, id: 0, name: '' },
    vatNumber: null,
    zipCode: '41321426132132        56456456',
    userId: 0,
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: true,
  },
];

export const mockGetAddressSchemaResponse = {
  addressSchemaLines: [
    {
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
  ],
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
