export const guestUserId = 34923;
export const mockGuestUserResponse = {
  id: guestUserId,
  bagId: 'string',
  wishlistId: 'string',
  ip: 'string',
  countryCode: 'string',
  externalId: 'string',
  friendId: 'string',
  expiryDate: '2020-03-31T15:21:55.109Z',
};

export const expectedNormalizedPayload = {
  entities: {
    user: {
      id: guestUserId,
      bagId: 'string',
      wishlistId: 'string',
      ip: 'string',
      countryCode: 'string',
      externalId: 'string',
      friendId: 'string',
      expiryDate: '2020-03-31T15:21:55.109Z',
    },
  },
  result: guestUserId,
};
