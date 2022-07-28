// Checkout item types
export enum ItemStatus {
  Available,
  NoStock,
  NotEnoughStock,
}

// Order item types
export enum OrderStatus {
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

export enum OrderItemStatus {
  None = 'None',
  OutOfStock = 'OutOfStock',
  WithStock = 'WithStock',
  SuggestAlternative = 'SuggestAlternative',
  ReturnWithShippinCost = 'ReturnWithShippinCost',
  ReturnWithoutShippinCost = 'ReturnWithoutShippinCost',
  Canceled = 'Canceled',
}
