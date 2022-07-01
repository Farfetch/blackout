import type { CountryAddress } from '../../../types/common/address.types';

export type CountryDetails = {
  countryCode: CountryAddress['alpha2Code'];
  countryCallingCode?: string;
};

export enum UserContactType {
  Phone = 'Phone',
}

export type UserContact = {
  id: string;
  value: string;
  countryDetails?: CountryDetails;
  type: UserContactType;
  description?: string;
  externalId?: string;
};

export type UserContactRequest = Omit<UserContact, 'id'>;
