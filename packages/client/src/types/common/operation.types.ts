/**
 * Contains definitions for the Bag and CheckoutOrder operation types.
 */

import type { Product } from '../../products/index.js';

export enum OperationChangeReason {
  BetterPromotionApplied = 'BetterPromotionApplied',
  ExternalCallTimedOut = 'ExternalCallTimedOut',
  InvalidPromocode = 'InvalidPromocode',
  LackOfBenefits = 'LackOfBenefits',
  NotActivePromotion = 'NotActivePromotion',
  OnlyForFirstPurchase = 'OnlyForFirstPurchase',
  OrderNotQualifiedForPromotion = 'OrderNotQualifiedForPromotion',
  PromocodeAlreadyUsedByOtherCustomer = 'PromocodeAlreadyUsedByOtherCustomer',
  PromocodeNoLongerAvailable = 'PromocodeNoLongerAvailable',
  Unknown = 'Unknown',
  UserNotQualifiedForPromotion = 'UserNotQualifiedForPromotion',
}

export enum OperationChangeType {
  ItemDiscountChanged = 'ItemDiscountChanged',
  ItemIsNowAvailable = 'ItemIsNowAvailable',
  ItemIsUnavailable = 'ItemIsUnavailable',
  ItemMerged = 'ItemMerged',
  ItemOriginChanged = 'ItemOriginChanged',
  ItemPriceChanged = 'ItemPriceChanged',
  ItemQuantityChanged = 'ItemQuantityChanged',
  NotEnoughStock = 'NotEnoughStock',
  PromoCodeEligibilityChanged = 'PromoCodeEligibilityChanged',
  PromotionNotApplied = 'PromotionNotApplied',
  SelectedSaleIntentChanged = 'SelectedSaleIntentChanged',
  ShippingCostChanged = 'ShippingCostChanged',
  ShippingFlatRateEligibilityChanged = 'ShippingFlatRateEligibilityChanged',
  TotalDiscountChanged = 'TotalDiscountChanged',
}

export type OperationChange = {
  changeType: OperationChangeType;
  itemId?: number;
  productId?: Product['result']['id'];
  variantId?: string;
  currency?: string;
  oldValue?: string;
  newValue?: string;
  promocode?: string;
  reason?: OperationChangeReason;
};

export enum OperationViolationFixSuggestionType {
  DecreaseQuantity = 'DecreaseQuantity',
  IncreaseValue = 'IncreaseValue',
  DecreaseValue = 'DecreaseValue',
}

export type OperationViolationFixSuggestion = {
  action: OperationViolationFixSuggestionType;
  value: string;
};

export type OperationViolation = {
  itemsIds?: number[];
  fixSuggestion?: OperationViolationFixSuggestion;
};

export type Operation = {
  id: string;
  createdDate: string;
  changes: Array<OperationChange>;
  violations: Array<OperationViolation>;
};
