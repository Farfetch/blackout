export type Provisioning = {
  merchantId: number;
  merchantLocationId: number;
  quantity: number;
  deliveryDateEstimateMinimum: string;
  deliveryDateEstimateMaximum: string;
  deliveryDateEstimate: string;
};

export type ItemDeliveryProvisioning = {
  itemId: number;
  provisioning: Provisioning[];
};
