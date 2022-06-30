export const id = 1345678;
export const expectedRecentlyViewedRemotePayload = {
  number: 1,
  totalPages: 1,
  totalItems: 1,
  entries: [
    {
      productId: 11111111,
      lastVisitDate: '2020-02-02T15:57:30.238Z',
    },
    {
      productId: 22222222,
      lastVisitDate: '2020-02-01T15:57:30.238Z',
    },
  ],
};

export const expectedRecentlyViewedLocalPayload = [
  {
    productId: 22222222,
    lastVisitDate: '2020-02-03T11:08:50.010Z',
  },
  {
    productId: 33333333,
    lastVisitDate: '2020-02-03T11:08:50.010Z',
  },
];
