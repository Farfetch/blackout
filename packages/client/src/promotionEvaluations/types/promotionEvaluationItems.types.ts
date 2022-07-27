export type PromotionEvaluationId = string;

export type PromotionEvaluationItem = {
  id: string;
  eligiblePromotions: Array<{
    promocode?: string;
    displayName: string;
    eligibleOffers: Array<{
      type: number;
      offerMoneyOff: {
        discount: number;
        currencyCode: string;
        formattedDiscount: string;
      };
      offerPercentOff: {
        discount: number;
        currencyCode: string;
        formattedDiscount: string;
      };
    }>;
  }>;
};