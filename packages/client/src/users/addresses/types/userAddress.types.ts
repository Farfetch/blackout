type City = {
  id: number;
  name: string;
  stateId?: number;
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
  continentId: number;
};

type Continent = {
  id: number;
  name: string;
  countries: Country[];
};

type State = {
  code?: string;
  countryId?: number;
  id: number;
  name: string;
};

export enum AddressType {
  Any,
  Shipping,
  Billing,
}

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  vatNumber?: string;
  city: City;
  state: State;
  country: Country;
  zipCode: string;
  phone: string;
  neighbourhood?: string;
  ddd?: string;
  continent?: Continent;
  addressType: AddressType;
  identityDocument?: string;
  customsClearanceCode?: string;
  title?: string;
  isCurrentShipping: boolean;
  isCurrentBilling: boolean;
  isCurrentPreferred: boolean;
  createdDate: string;
  updatedDate?: string;
};
