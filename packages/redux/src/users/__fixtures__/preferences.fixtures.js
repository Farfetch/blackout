const code = 'codee1';

export const mockGetPreferencesResponse = [
  {
    code,
    values: ['136968', '136831', '136908'],
    groupId: 'mobile',
    updatedDate: '2019-08-19T10:46:59.543Z',
  },
];

export const expectedPreferencesNormalizedPayload = {
  entities: {
    preferences: {
      [code]: {
        ...mockGetPreferencesResponse[0],
      },
    },
  },
  result: [code],
};
