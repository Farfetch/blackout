import type { City, State } from '../../locale/types/index.js';
import type { User } from '../../users/authentication/types/user.types.js';

export type Continent = {
  id: number;
  name: string;
  countries: CountryAddress[];
};

export type CountryAddress = {
  id: number;
  name: string;
  nativeName?: string | null;
  alpha2Code: string;
  alpha3Code?: string | null;
  culture?: string | null;
  region?: string | null;
  regionId?: number;
  subRegion?: string | null;
  continentId: number;
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
  /** @deprecated use phoneContact field instead  */
  phone?: string;
  phoneContact?: PhoneContact;
  neighbourhood?: string | null;
  ddd?: string | null;
  continent?: Continent | null;
};

export type PaymentAddress = AddressBase & {
  id: string;
  userId: number;
  isDefaultBillingAddress: boolean;
  isDefaultShippingAddress: boolean;
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

export type PaymentTokenBillingAddress =
  AddressWithOptionalLocation<AddressWithRecipient> & {
    id?: string;
    /** @deprecated userId should not be used as its value never changes */
    userId?: 0;
    /** @deprecated isDefaultBillingAddress should not be used as its value never changes */
    isDefaultBillingAddress?: false;
    /** @deprecated isDefaultShippingAddress should not be used as its value never changes */
    isDefaultShippingAddress?: false;
  };

export type PhoneContact = {
  value: string;
  countryCode?: CountryAddress['alpha2Code'];
  countryCallingCode?: string;
};

export type StoreAddress = AddressWithRecipient & {
  latitude?: string;
  longitude?: string;
  subfolder?: string;
};

export type CheckoutAddress = Omit<AddressWithRecipient, 'continent'> & {
  id?: string;
  /** @deprecated userId should not be used as its value never changes */
  userId?: 0;
  /** @deprecated isDefaultBillingAddress should not be used as its value never changes */
  isDefaultBillingAddress?: false;
  /** @deprecated isDefaultShippingAddress should not be used as its value never changes */
  isDefaultShippingAddress?: false;
};

export type CheckoutShippingAddress = Omit<CheckoutAddress, 'country'> & {
  country: CountryAddress & {
    subfolder?: string;
  };
};

export type DraftOrderAddress = Omit<
  CheckoutAddress,
  'userId' | 'isDefaultBillingAddress' | 'isDefaultShippingAddress'
>;

export type UserAddress = CategorisedAddress & {
  id: string;
  isCurrentShipping?: boolean;
  isCurrentBilling?: boolean;
  isCurrentPreferred?: boolean;
  createdDate?: string;
  updatedDate?: string;
  version?: number;
  addressId?: string;
};

export type UserAddressLegacy = Omit<
  UserAddress,
  'isCurrentShipping' | 'isCurrentBilling' | 'isCurrentPreferred'
> & {
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
  isPreferredAddress?: boolean;
  userId: User['id'];
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
