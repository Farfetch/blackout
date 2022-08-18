import type { CountryAddress } from '../../types';

export enum ReturnType {
  Courier,
  InStore,
  CourierDropOff,
  CourierPickUp,
  Manual,
}

export type ReturnOption = {
  type: ReturnType;
  locationsUri: string;
  allowedCountries: CountryAddress[];
  isNumberOfBoxesMandatory: boolean;
  isMerchantLocationMandatory: boolean;
  isAddressMandatory: boolean;
  isSchedulePickup: boolean;
};

export enum RefundPaymentType {
  Default,
  Credit,
}

export type MerchantOrderReturnOptions = {
  merchantId: number;
  merchantOrderId: number;
  options: ReturnOption[];
  availableRefundPaymentTypes: RefundPaymentType[];
};
