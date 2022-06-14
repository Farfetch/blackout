export type CountryDetails = {
  countryCode: string;
  countryCallingCode: string;
};

export type UserContactResponse = {
  id: string;
  value: string;
  countryDetails: CountryDetails;
  type: string;
  description: string;
};

export type UserContact = {
  id: number;
  value: string;
  countryDetails: CountryDetails;
  type: string;
  description: string;
};
