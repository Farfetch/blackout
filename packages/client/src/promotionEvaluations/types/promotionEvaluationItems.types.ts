export type PromotionEvaluationId = string;

export enum EligibleOfferType {
  OfferMoneyOff = 1,
  OfferPercentOff = 2,
}

export type EligibleOffer = {
  type: EligibleOfferType;
  offerMoneyOff: {
    discount: number;
    currencyCode: string;
    formattedDiscount: string;
  };
  offerPercentOff: {
    discount: number;
    currencyCode: string;
    formattedDiscount: string;
  } | null;
};

export type EligiblePromotion = {
  promocode?: string | null;
  displayName: string;
  eligibleOffers: Array<EligibleOffer>;
};

export type PromotionEvaluationItem = {
  id: string;
  eligiblePromotions: Array<EligiblePromotion>;
};
