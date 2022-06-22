enum CheckoutOrderChangeReason {
  LackOfBenefits = 'LackOfBenefits',
  InvalidPromocode = 'InvalidPromocode',
  NotActivePromotion = 'NotActivePromotion',
  OnlyForFirstPurchase = 'OnlyForFirstPurchase',
  UserNotQualifiedForPromotion = 'UserNotQualifiedForPromotion',
  PromocodeNoLongerAvailable = 'PromocodeNoLongerAvailable',
  PromocodeAlreadyUsedByOtherCustomer = 'PromocodeAlreadyUsedByOtherCustomer',
  OrderNotQualifiedForPromotion = 'OrderNotQualifiedForPromotion',
  BetterPromotionApplied = 'BetterPromotionApplied',
  ExternalCallTimedOut = 'ExternalCallTimedOut',
  Unknown = 'Unknown',
}

interface OperationChange {
  checkoutOrderItemID?: number;
  currency?: string;
  itemId?: number;
  newCurrency?: string;
  newPrice?: {
    priceInclTaxes?: number;
  };
  newValue?: string;
  oldCurrency?: string;
  oldPrice?: {
    priceInclTaxes?: number;
  };
  oldValue?: string;
  productId?: number;
  promocode?: string;
  reason?: CheckoutOrderChangeReason;
  stockAvailable?: number;
  variantId?: string;
}

type ChangeTypeItemDiscountChanged = {
  changeType: 'ItemDiscountChanged';
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

type ChangeTypeItemIsUnavailable = {
  changeType: 'ItemIsUnavailable';
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
  reason?: OperationChange['reason'];
};

type ChangeTypeItemOriginChanged = {
  changeType: 'ItemOriginChanged';
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
};

type ChangeTypeItemPriceChanged = {
  changeType: 'ItemPriceChanged';
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
};

type ChangeTypeItemQuantityChanged = {
  changeType: 'ItemQuantityChanged';
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

type ChangeTypeItemNotEnoughStock = {
  changeType: 'NotEnoughStock';
  itemId?: OperationChange['itemId'];
  stockAvailable?: OperationChange['stockAvailable'];
};

type ChangeTypePromoCodeEligibilityChanged = {
  changeType: 'PromoCodeEligibilityChanged';
  promocode?: OperationChange['promocode'];
  reason?: OperationChange['reason'];
};

type ChangeTypePromotionNotApplied = {
  changeType: 'PromotionNotApplied';
};

type ChangeTypeShippingCostChanged = {
  changeType: 'ShippingCostChanged';
};

type ChangeTypeShippingFlatRateEligibilityChanged = {
  changeType: 'ShippingFlatRateEligibilityChanged';
};

type ChangeTypeTotalDiscountChanged = {
  changeType: 'TotalDiscountChanged';
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

export type CheckoutOrderOperationChange =
  | ChangeTypeItemDiscountChanged
  | ChangeTypeItemIsUnavailable
  | ChangeTypeItemOriginChanged
  | ChangeTypeItemPriceChanged
  | ChangeTypeItemQuantityChanged
  | ChangeTypeItemNotEnoughStock
  | ChangeTypePromoCodeEligibilityChanged
  | ChangeTypePromotionNotApplied
  | ChangeTypeShippingCostChanged
  | ChangeTypeShippingFlatRateEligibilityChanged
  | ChangeTypeTotalDiscountChanged;
