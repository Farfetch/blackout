import type { City, Continent, Country, State } from '.';

export type Address = {
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  vatNumber?: string;
  zipCode: string;
  phone?: string;
  neighbourhood?: string;
  ddd?: string;
  city: City;
  state?: State;
  country: Country;
  continent?: Continent;
};
