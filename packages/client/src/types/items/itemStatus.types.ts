// Checkout item types
export enum CheckoutOrderItemStatus {
  Available,
  NoStock,
  NotEnoughStock,
}

// Order item types
export enum MerchantOrderStatus {
  Created = 'Created',
  CheckingStock = 'CheckingStock',
  ProcessingPayment = 'ProcessingPayment',
  Packaging = 'Packaging',
  Awb = 'Awb',
  PreparingToDispatch = 'PreparingToDispatch',
  InTransit = 'InTransit',
  CollectInStore = 'CollectInStore',
  ReadyToCollect = 'ReadyToCollect',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Returned = 'Returned',
}

export enum MerchantOrderStatusLegacy {
  Created = 0,
  CheckingStock = 1,
  ProcessingPayment = 2,
  Packaging = 3,
  Awb = 4,
  PreparingToDispatch = 5,
  InTransit = 6,
  CollectInStore = 7,
  ReadyToCollect = 8,
  Delivered = 100,
  Cancelled = 97,
  Returned = 98,
}

export enum OrderItemStatus {
  None = 'None',
  OutOfStock = 'OutOfStock',
  WithStock = 'WithStock',
  SuggestAlternative = 'SuggestAlternative',
  ReturnWithShippinCost = 'ReturnWithShippinCost',
  ReturnWithoutShippinCost = 'ReturnWithoutShippinCost',
  Canceled = 'Canceled',
}

export enum OrderItemStatusLegacy {
  None = 0,
  OutOfStock = 1,
  WithStock = 2,
  ReturnWithShippinCost = 3,
  ReturnWithoutShippinCost = 4,
  SuggestAlternative = 5,
  Canceled = 10,
}
