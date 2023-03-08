export const expectedRecommendedProductsPayload = [
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

export const mockRecommendedProductsProductId = '12913174';
export const mockRecommendedProductsId = '11111';
export const mockRecommendedProductsStrategy = 'fpswhitelabel_pdp_generic_a';

export const mockRecommendedProductsState = {
  recommendedProducts: {
    error: {},
    isLoading: {},
    result: {
      [mockRecommendedProductsStrategy]: {
        id: mockRecommendedProductsId,
        values: [
          {
            id: mockRecommendedProductsProductId,
            score: 0.748578548431396,
          },
        ],
      },
    },
  },
};
