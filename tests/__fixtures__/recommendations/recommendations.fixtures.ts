export const expectedPayload = [
  {
    id: '000-00000-0000-0000',
    products: [
      {
        product: {
          id: '123',
        },
        score: 0.9,
        trackers: [],
        productRecommendationType: 0,
      },
      {
        product: {
          id: '321',
        },
        score: 0.8,
        trackers: [],
        productRecommendationType: 0,
      },
    ],
  },
];

export const mockProductId = 12913174;
export const mockRecommendationId = '11111';
export const mockRecommendationsStrategy = 'fpswhitelabel_pdp_generic_a';

export const mockState = {
  recommendations: {
    error: {},
    isLoading: {},
    result: {
      [mockRecommendationsStrategy]: {
        id: mockRecommendationId,
        values: [
          {
            id: mockProductId,
            score: 0.748578548431396,
          },
        ],
      },
    },
  },
};
