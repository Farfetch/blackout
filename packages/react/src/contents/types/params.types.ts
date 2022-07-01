import type { Gender, PriceType, Type } from '@farfetch/blackout-client';

export type Params = {
  // Query a content by a specific country (country:GB).
  countryCode?: string;
  // Query a content by a specific language (language:en-GB).
  cultureCode?: string;
  // Query a content by is benefits (benefits:test).
  benefits?: string;
  // Query a content by a specific content zone (contentzone:ROW).
  contentzone?: string;
  // Query a content by a specific environmentcode (environmentcode:live|preview).
  environmentcode?: string;
  // Query a content by a specific target preview guid.
  preview?: string;
};

export type CommercePagesParams = {
  // Query by a page type.
  type: Type;
  // Query by a specified product or set identifier.
  id?: string;
  // Query by a gender (E.g. 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid).
  gender?: Gender;
  // Query by a specified brand identifier.
  brand?: number;
  // Query by a specified category identifiers, separated by commas (E.g. 139065,139088).
  category?: string;
  // uery by a specified price type, separated by commas (E.g. 0,1,2).
  priceType?: PriceType;
  // Query by a specified sku identifier.
  sku?: number;
};
