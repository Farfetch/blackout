enum CheckoutOrderOperationChangeType {
  ItemDiscountChanged = 'ItemDiscountChanged',
  ItemIsUnavailable = 'ItemIsUnavailable',
  ItemOriginChanged = 'ItemOriginChanged',
  ItemPriceChanged = 'ItemPriceChanged',
  ItemQuantityChanged = 'ItemQuantityChanged',
  NotEnoughStock = 'NotEnoughStock',
  PromoCodeEligibilityChanged = 'PromoCodeEligibilityChanged',
  PromotionNotApplied = 'PromotionNotApplied',
  ShippingCostChanged = 'ShippingCostChanged',
  ShippingFlatRateEligibilityChanged = 'ShippingFlatRateEligibilityChanged',
  TotalDiscountChanged = 'TotalDiscountChanged',
}

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
  changeType: CheckoutOrderOperationChangeType.ItemDiscountChanged;
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

type ChangeTypeItemIsUnavailable = {
  changeType: CheckoutOrderOperationChangeType.ItemIsUnavailable;
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
  reason?: OperationChange['reason'];
};

type ChangeTypeItemOriginChanged = {
  changeType: CheckoutOrderOperationChangeType.ItemOriginChanged;
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
};

type ChangeTypeItemPriceChanged = {
  changeType: CheckoutOrderOperationChangeType.ItemPriceChanged;
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
};

type ChangeTypeItemQuantityChanged = {
  changeType: CheckoutOrderOperationChangeType.ItemQuantityChanged;
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

type ChangeTypeItemNotEnoughStock = {
  changeType: CheckoutOrderOperationChangeType.NotEnoughStock;
  itemId?: OperationChange['itemId'];
  stockAvailable?: OperationChange['stockAvailable'];
};

type ChangeTypePromoCodeEligibilityChanged = {
  changeType: CheckoutOrderOperationChangeType.PromoCodeEligibilityChanged;
  promocode?: OperationChange['promocode'];
  reason?: OperationChange['reason'];
};

type ChangeTypePromotionNotApplied = {
  changeType: CheckoutOrderOperationChangeType.PromotionNotApplied;
};

type ChangeTypeShippingCostChanged = {
  changeType: CheckoutOrderOperationChangeType.ShippingCostChanged;
};

type ChangeTypeShippingFlatRateEligibilityChanged = {
  changeType: CheckoutOrderOperationChangeType.ShippingFlatRateEligibilityChanged;
};

type ChangeTypeTotalDiscountChanged = {
  changeType: CheckoutOrderOperationChangeType.TotalDiscountChanged;
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
