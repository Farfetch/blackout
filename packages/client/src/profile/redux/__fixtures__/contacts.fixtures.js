export const mockGetContactResponse = {
  id: '4c46a918-303b-4847-8825-dfb295acb6c8',
  value: 'TEST',
  countryDetails: {
    countryCode: 'PT',
    countryCallingCode: '351',
  },
  type: 'Phone',
  description: 'TEST',
};
export const mockPostContactResponse = mockGetContactResponse;
export const mockGetContactsResponse = [
  {
    id: '4c46a918-303b-4847-8825-dfb295acb6c8',
    value: 'TEST',
    countryDetails: {
      countryCode: 'PT',
      countryCallingCode: '351',
    },
    type: 'Phone',
    description: 'TEST',
  },
  {
    id: '659f6cb5-d286-4635-a5dd-62e74a26d4c9',
    value: 'sadsada',
    countryDetails: {
      countryCode: 'BR',
      countryCallingCode: '55',
    },
    type: 'Phone',
    description: 'rfdewrewrewrwerew',
  },
];

export const expectedGetContactNormalized = {
  entities: {
    contacts: {
      [mockGetContactResponse.id]: mockGetContactResponse,
    },
  },
  result: mockGetContactResponse.id,
};
export const expectedCreateContactNormalized = expectedGetContactNormalized;
export const expectedGetContactsNormalized = {
  entities: {
    contacts: {
      [mockGetContactsResponse[0].id]: mockGetContactsResponse[0],
      [mockGetContactsResponse[1].id]: mockGetContactsResponse[1],
    },
  },
  result: [mockGetContactsResponse[0].id, mockGetContactsResponse[1].id],
};
