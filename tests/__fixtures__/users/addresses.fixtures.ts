import { AddressType, UserAddress } from '@farfetch/blackout-client';

export const addressId = '1234';
export const addressId2 = '2222222';
export const addressId3 = '33333333';

export const address1: UserAddress = {
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
    regionId: 10,
    subRegion: 'dummy',
  },
  zipCode: '8600',
  phone: '434343434',
  addressType: AddressType.Billing,
  isCurrentShipping: true,
  isCurrentBilling: true,
  isCurrentPreferred: true,
  createdDate: '2021-03-31T08:45:41.307Z',
  updatedDate: '2021-11-03T17:24:48.37Z',
};

export const address2: UserAddress = {
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
    regionId: 10,
    subRegion: 'dummy',
  },
  zipCode: '4840-010',
  phone: '969696969',
  addressType: AddressType.Any,
  isCurrentShipping: false,
  isCurrentBilling: false,
  isCurrentPreferred: false,
  createdDate: '2021-11-03T16:46:17.584Z',
  updatedDate: '2021-11-04T10:13:44.782Z',
};

export const address3: UserAddress = {
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
    regionId: 10,
    subRegion: 'dummy',
  },
  zipCode: '4840-010',
  phone: '969696969',
  addressType: AddressType.Any,
  isCurrentShipping: false,
  isCurrentBilling: false,
  isCurrentPreferred: false,
  createdDate: '2021-11-03T16:46:17.584Z',
  updatedDate: '2021-11-04T10:13:44.782Z',
};

export const mockGetAddressesResponse = [address1, address2];

export const mockGetAddressResponse = address1;

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

export const mockPostUserAddressResponse = {
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

export const expectedPostUserAddressNormalizedPayload = {
  entities: {
    addresses: {
      [addressId]: {
        ...mockPostUserAddressResponse,
      },
    },
  },
  result: addressId,
};

export const expectedGetAddressesNormalizedPayload = {
  entities: {
    addresses: {
      [addressId]: mockGetAddressesResponse[0] as UserAddress,
      [addressId2]: mockGetAddressesResponse[1] as UserAddress,
    },
  },
  result: [addressId, addressId2],
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
