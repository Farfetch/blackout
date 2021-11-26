export enum DeliveryWindowType {
  Nominated,
  Estimated,
}

export type DeliveryWindow = {
  type: DeliveryWindowType;
  min: string;
  max: string;
};
