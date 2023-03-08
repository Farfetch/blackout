import type { BagItem } from './bagItem.types.js';
import type { Product } from '../../products/index.js';

export enum BagChangeReason {
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

type NotificationPrice = {
  priceInclTaxes?: number;
};

export enum ChangeType {
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

interface OperationChange {
  changeType: ChangeType;
  currency?: string;
  itemId?: BagItem['id'];
  newPrice?: NotificationPrice;
  newValue?: string;
  oldCurrency?: string;
  oldPrice?: NotificationPrice;
  oldValue?: string;
  productId?: Product['result']['id'];
  promocode?: string;
  reason?: BagChangeReason;
  stockAvailable?: number;
  variantId?: string;
}

type ChangeTypeItemDiscountChanged = {
  changeType: ChangeType.ItemDiscountChanged;
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

type ChangeTypeItemIsNowAvailable = {
  changeType: ChangeType.ItemIsNowAvailable;
  itemId?: OperationChange['itemId'];
};

type ChangeTypeItemIsUnavailable = {
  changeType: ChangeType.ItemIsUnavailable;
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
  reason?: OperationChange['reason'];
};

type ChangeTypeItemMerged = {
  changeType: ChangeType.ItemMerged;
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
  oldValue?: OperationChange['oldValue'];
  newValue?: OperationChange['newValue'];
};

type ChangeTypeItemOriginChanged = {
  changeType: ChangeType.ItemOriginChanged;
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
};

type ChangeTypeItemPriceChanged = {
  changeType: ChangeType.ItemPriceChanged;
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
};

type ChangeTypeItemQuantityChanged = {
  changeType: ChangeType.ItemQuantityChanged;
  itemId?: OperationChange['itemId'];
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

type ChangeTypeItemNotEnoughStock = {
  changeType: ChangeType.NotEnoughStock;
  itemId?: OperationChange['itemId'];
  stockAvailable?: OperationChange['stockAvailable'];
};

type ChangeTypePromoCodeEligibilityChanged = {
  changeType: ChangeType.PromoCodeEligibilityChanged;
};

type ChangeTypePromotionNotApplied = {
  changeType: ChangeType.PromotionNotApplied;
};

type ChangeTypeShippingCostChanged = {
  changeType: ChangeType.ShippingCostChanged;
};

type ChangeTypeShippingFlatRateEligibilityChanged = {
  changeType: ChangeType.ShippingFlatRateEligibilityChanged;
};

type ChangeTypeTotalDiscountChanged = {
  changeType: ChangeType.TotalDiscountChanged;
  newValue?: OperationChange['newValue'];
  oldValue?: OperationChange['oldValue'];
};

type ChangeTypeSelectedSaleIntentChanged = {
  changeType: ChangeType.SelectedSaleIntentChanged;
  productId?: OperationChange['productId'];
  variantId?: OperationChange['variantId'];
  itemId?: OperationChange['itemId'];
  oldValue?: OperationChange['oldValue'];
  newValue?: OperationChange['newValue'];
};

export type BagOperationChange =
  | ChangeTypeItemDiscountChanged
  | ChangeTypeItemIsNowAvailable
  | ChangeTypeItemIsUnavailable
  | ChangeTypeItemMerged
  | ChangeTypeItemOriginChanged
  | ChangeTypeItemPriceChanged
  | ChangeTypeItemQuantityChanged
  | ChangeTypeItemNotEnoughStock
  | ChangeTypePromoCodeEligibilityChanged
  | ChangeTypePromotionNotApplied
  | ChangeTypeSelectedSaleIntentChanged
  | ChangeTypeShippingCostChanged
  | ChangeTypeShippingFlatRateEligibilityChanged
  | ChangeTypeTotalDiscountChanged;

export enum BagViolationFixSuggestionAction {
  DecreaseQuantity = 'DecreaseQuantity',
  IncreaseValue = 'IncreaseValue',
  DecreaseValue = 'DecreaseValue',
}

export type BagViolationFixSuggestion = {
  action: BagViolationFixSuggestionAction;
  value: string;
};

export type BagViolation = {
  itemsIds?: Array<BagItem['id']>;
  fixSuggestion?: BagViolationFixSuggestion;
};

export type BagOperation = {
  id: string;
  createdDate: string;
  changes: Array<BagOperationChange>;
  violations: Array<BagViolation>;
};
