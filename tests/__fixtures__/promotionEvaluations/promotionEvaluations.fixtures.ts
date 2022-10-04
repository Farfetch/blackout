import { toBlackoutError } from '@farfetch/blackout-client';

export const mockPromotionEvaluationId = '123456';
export const mockPromotionEvaluationItemId = '123456-7890';

export const mockPromotionEvaluationsItemsResponse = [
  {
    id: mockPromotionEvaluationItemId,
    eligiblePromotions: [
      {
        promocode: null,
        displayName: 'Promotion test',
        eligibleOffers: [
          {
            type: 1,
            offerMoneyOff: {
              discount: 50.0,
              currencyCode: 'EUR',
              formattedDiscount: '50 €',
            },
            offerPercentOff: null,
          },
        ],
      },
    ],
  },
];

export const mockInitialState = {
  promotionEvaluations: {
    id: null,
    error: null,
    isLoading: false,
    result: null,
  },
};

export const mockLoadingState = {
  promotionEvaluations: {
    id: null,
    error: null,
    isLoading: true,
    result: null,
  },
};

export const mockErrorState = {
  promotionEvaluations: {
    id: null,
    error: toBlackoutError(new Error('error message')),
    isLoading: false,
    result: null,
  },
};

export const mockState = {
  promotionEvaluations: {
    id: mockPromotionEvaluationId,
    error: null,
    isLoading: false,
    result: mockPromotionEvaluationsItemsResponse,
  },
};
