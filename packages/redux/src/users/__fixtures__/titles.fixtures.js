export const idTitle1 = '000';
const idTitle2 = '111';

export const mockGetTitlesResponse = {
  number: 1,
  totalPages: 1,
  totalItems: 2,
  entries: [
    {
      id: idTitle1,
      value: 'title1',
    },
    {
      id: idTitle2,
      value: 'title2',
    },
  ],
};

export const expectedTitlesNormalizedPayload = {
  entities: {
    titles: {
      [idTitle1]: {
        ...mockGetTitlesResponse.entries[0],
      },
      [idTitle2]: {
        ...mockGetTitlesResponse.entries[1],
      },
    },
  },
  result: {
    entries: [idTitle1, idTitle2],
    number: 1,
    totalPages: 1,
    totalItems: 2,
  },
};
