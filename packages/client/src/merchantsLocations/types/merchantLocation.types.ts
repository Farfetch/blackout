import type { CategorisedAddress } from '../../types/common/address.types';

export enum MerchantLocationWeekday {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export type MerchantLocation = {
  id: number;
  merchantId: number;
  merchantName: string;
  isReturnsInStoreAllowed: boolean;
  address: CategorisedAddress;
  lat: string;
  lon: string;
  businessDays: Array<{
    hours: Array<{
      open: string;
      close: string;
    }>;
    weekday: MerchantLocationWeekday;
  }>;
  sameDayDelivery: {
    isActive: boolean;
    cutOffTime: string;
  };
  isCollectPoint: boolean;
  deliveryPoints?: Array<{
    deliveryType: number;
    startTime: string;
    endTime: string;
    isEnabled: boolean;
  }>;
};
