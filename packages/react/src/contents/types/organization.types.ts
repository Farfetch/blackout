export type Address = {
  // Stress Address name.
  street: string;
  // Stress Locality name.
  locality: string;
  // Stress Region name.
  region: string;
  // Stress Postal Code name.
  postalCode: string;
  // Stress Country name.
  country: string;
};

export type Contact = {
  // Phone number contact.
  phone: string;
  // Contact type (e.g. Customer Service).
  type: string;
  // E-mail contact.
  email: string;
  // Contact Option (e.g. A toll-free number or support for hearing-impaired callers).
  option: string;
  // The geographic area where a service or offered item is provided.
  areaServed: string;
};
