import type { City, State } from '../../locale/types';

export type Continent = {
  id: number;
  name: string;
  countries: CountryAddress[];
};

export type CountryAddress = {
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

export type AddressBase = {
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  vatNumber?: string;
  city: City;
  state?: State;
  country: CountryAddress;
  zipCode: string;
  phone?: string;
  neighbourhood?: string;
  ddd?: string;
  continent?: Continent;
};

export type AddressPredictionDetails = {
  addressLine1: string;
  cityName: string;
  countryName: string;
  districtName: string;
  postalCode: string;
  provinceName: string;
  streetName: string;
};

export type AddressWithRecipient = AddressBase & {
  firstName: string;
  lastName: string;
};

export enum AddressType {
  Any = 'Any',
  Shipping = 'Shipping',
  Billing = 'Billing',
}

export type CategorisedAddress = AddressWithRecipient & {
  addressType?: AddressType;
};

export type AddressWithOptionalLocation<T extends AddressBase> = Omit<
  T,
  'city' | 'country'
> & {
  city?: T['city'];
  country?: T['country'];
};

export type PhoneContact = {
  value: string;
  countryCode?: CountryAddress['alpha2Code'];
  countryCallingCode?: string;
};

export type StoreAddress = AddressWithRecipient & {
  latitude?: string;
  longitude?: string;
};

export type CheckoutAddress = CategorisedAddress & {
  phoneContact?: PhoneContact;
  identityDocument?: string;
  customsClearanceCode?: string;
  title?: string;
};

export type UserAddress = CheckoutAddress & {
  id: string;
  isCurrentShipping?: boolean;
  isCurrentBilling?: boolean;
  isCurrentPreferred?: boolean;
  createdDate?: string;
  updatedDate?: string;
  version?: number;
  addressId?: string;
};

export type UserAddressInput = Omit<
  UserAddress,
  | 'id'
  | 'createdDate'
  | 'isCurrentShipping'
  | 'isCurrentBilling'
  | 'isCurrentPreferred'
  | 'updatedDate'
  | 'version'
  | 'addressId'
> & { id?: UserAddress['id'] };
