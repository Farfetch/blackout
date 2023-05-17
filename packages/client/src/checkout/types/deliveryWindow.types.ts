export enum CheckoutOrderDeliveryWindowType {
  Nominated,
  Estimated,
}

export type CheckoutOrderDeliveryWindow = {
  type: CheckoutOrderDeliveryWindowType;
  min: string;
  max: string;
};
