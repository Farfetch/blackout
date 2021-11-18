import {
  getUser,
  getUserCredit,
  getUserCreditMovements,
  getUserTitle,
} from '..';
const userId = 123456;
const mockUserDetails = userId => ({
  bagId: 'cb805dc8-86f5-409e-84d1-3209c2be9517',
  dateOfBirth: null,
  email: 'pepe@acme.com',
  gender: 0,
  id: userId,
  name: 'Pedro Guilherme Fernandes',
  phoneNumber: null,
  segments: [],
  username: 'pepe@acme.com',
  wishlistId: '1e5232f8-7af0-4fba-b6b1-b87e2cb3a88f',
  isExternalLogin: false,
  isGuest: false,
  guestBagItemsMerged: 0,
  title: {
    id: '123',
    value: 'Dr.',
  },
  credit: {
    currency: 'GB',
    value: 50,
    formattedValue: '£50',
  },
  creditMovements: {
    entries: [
      {
        type: 1,
        value: 0.57,
        formattedValue: '$0.57',
        currency: 'USD',
        description: 'Other Reason (FF fault)',
        createdOn: '/Date(1581071861195)/',
      },
      {
        type: 2,
        value: 13.97,
        formattedValue: '$13.97',
        currency: 'USD',
        description: 'EUR 12.56 credit was Used - Order W95FWA',
        createdOn: '/Date(1579792756504)/',
      },
    ],
    number: 1,
    totalItems: 2,
    totalPages: 1,
  },
});
const state = {
  entities: {
    user: mockUserDetails(userId),
  },
};
describe('getUser()', () => {
  it('should return the user entity', () => {
    expect(getUser(state)).toEqual(mockUserDetails(userId));
  });
});

describe('getUserTitle()', () => {
  it('should return the title value from the user entity', () => {
    const titleDetails = mockUserDetails(userId).title;
    expect(getUserTitle(state.entities.user)).toEqual(titleDetails);
  });
});

describe('getUserCredit()', () => {
  it('should return the credit value from the user entity', () => {
    const creditDetails = mockUserDetails(userId).credit;
    expect(getUserCredit(state.entities.user)).toEqual(creditDetails);
  });
});

describe('getUserCreditMovements()', () => {
  it('should return the credit movements value from the user entity', () => {
    const creditMovementsDetails = mockUserDetails(userId).creditMovements;
    expect(getUserCreditMovements(state.entities.user)).toEqual(
      creditMovementsDetails,
    );
  });
});
