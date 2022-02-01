export type ReturnOptionsEntity = {
  id: string;
  type: number;
  allowedCountries: Countries[];
  isNumberOfBoxesMandatory: boolean;
  isMerchantLocationMandatory: boolean;
  isAddressMandatory: boolean;
  isSchedulePickup: boolean;
  merchantOrderId: number;
  merchant: number;
};

type Countries = {
  id: number;
  name: string;
  nativeName: string;
  alpha2Code: string;
  alpha3Code: string;
  culture: string;
  region: string;
  subRegion: string;
  regionId: number;
  continentId: number;
};
