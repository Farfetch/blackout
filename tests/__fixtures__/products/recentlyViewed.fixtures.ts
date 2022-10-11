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

export const mockRecentlyViewedState = {
  recentlyViewed: {
    error: null,
    loading: false,
    result: {
      remote: {
        number: 1,
        totalPages: 1,
        totalItems: 2,
        entries: [
          {
            productId: 12913172,
            lastVisitDate: '2022-10-10T14:22:51.587Z',
          },
          {
            productId: 12913174,
            lastVisitDate: '2022-10-10T14:04:05.315Z',
          },
        ],
      },
      pagination: {
        number: 1,
        totalPages: 1,
        totalItems: 2,
      },
      computed: [
        {
          productId: 12913172,
          lastVisitDate: '2022-10-10T14:22:51.587Z',
        },
        {
          productId: 12913174,
          lastVisitDate: '2022-10-10T14:04:05.315Z',
        },
      ],
    },
  },
};
