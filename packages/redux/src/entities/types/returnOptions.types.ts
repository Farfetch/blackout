import type { Country } from '@farfetch/blackout-client';

export type ReturnOptionsEntity = {
  id: string;
  type: number;
  allowedCountries: Country[];
  isNumberOfBoxesMandatory: boolean;
  isMerchantLocationMandatory: boolean;
  isAddressMandatory: boolean;
  isSchedulePickup: boolean;
  merchantOrderId: number;
  merchant: number;
};
