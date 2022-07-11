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
    stateId: number | null;
  };
  country: {
    alpha2Code: string;
    alpha3Code: string;
    culture: string;
    id: number;
    name: string;
    nativeName: string;
    region: string;
    subRegion: string | null;
    regionId: number;
    subfolder: string;
    continentId: number;
  };
  ddd: string | null;
  firstName: string;
  id: string;
  lastName: string;
  neighbourhood: string | null;
  phone: string;
  state: {
    code: string | null;
    countryId: number;
    id: number;
    name: string | null;
  };
  vatNumber: string | null;
  zipCode: string;
  userId: number;
  isDefaultBillingAddress: boolean;
  isDefaultShippingAddress: boolean;
};
