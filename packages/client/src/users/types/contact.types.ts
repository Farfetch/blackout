export type CountryDetails = {
  countryCode: string;
  countryCallingCode: string;
};

export type ContactResponse = {
  id: string;
  value: string;
  countryDetails: CountryDetails;
  type: string;
  description: string;
};

export type Contact = {
  id: number;
  value: string;
  countryDetails: CountryDetails;
  type: string;
  description: string;
};
