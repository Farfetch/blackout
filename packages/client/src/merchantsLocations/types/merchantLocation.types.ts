type City = {
  id: number;
  name: string;
  stateId: number;
  countryId: number;
};

type Country = {
  id: number;
  name: string;
  nativeName: string;
  alpha2Code: string;
  alpha3Code: string;
  culture: string;
  region: string;
  regionId: number;
  subRegion: string;
  continentId: number;
  subfolder: string;
};

type State = {
  code: string;
  countryId: number;
  id: number;
  name: string;
};

type Address = {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: City;
  country: Country;
  ddd: string;
  title: string;
  neighbourhood: string;
  phone: string;
  state: State;
  vatNumber: string;
  zipCode: string;
  userId: number;
  isDefaultBillingAddress: boolean;
  isDefaultShippingAddress: boolean;
  isPreferredAddress: boolean;
  customsClearanceCode: string;
};

export type MerchantLocation = {
  id: number;
  merchantId: number;
  merchantName: string;
  isReturnsInStoreAllowed: boolean;
  address: Address;
  lat: string;
  lon: string;
  businessDays: Array<{
    hours: Array<{
      open: string;
      close: string;
    }>;
    weekday: number;
  }>;
  sameDayDelivery: {
    isActive: boolean;
    cutOffTime: string;
  };
  isCollectPoint: boolean;
  deliveryPoints: Array<{
    deliveryType: number;
    startTime: string;
    endTime: string;
    isEnabled: boolean;
  }>;
};
