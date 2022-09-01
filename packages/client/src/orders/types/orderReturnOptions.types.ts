import type { CountryAddress } from '../../types';

export enum ReturnOptionType {
  Courier = 'Courier',
  InStore = 'InStore',
  CourierDropOff = 'CourierDropOff',
  CourierPickUp = 'CourierPickUp',
  Manual = 'Manual',
}

export type ReturnOption = {
  type: ReturnOptionType;
  locationsUri?: string;
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
