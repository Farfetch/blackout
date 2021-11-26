export type FlatAddress = {
  latitude?: string;
  longitude?: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: {
    countryId: number;
    id: number;
    name: string;
    stateId: number;
  };
  country: {
    alpha2Code: string;
    alpha3Code: string;
    culture: string;
    id: number;
    name: string;
    nativeName: string;
    region: string;
    subRegion: string;
    regionId: number;
    subfolder: string;
    continentId: number;
  };
  ddd: string;
  firstName: string;
  id: string;
  lastName: string;
  neighbourhood: string;
  phone: string;
  state: {
    code: string;
    countryId: number;
    id: number;
    name: string;
  };
  vatNumber: string;
  zipCode: string;
  userId: number;
  isDefaultBillingAddress: boolean;
  isDefaultShippingAddress: boolean;
};
