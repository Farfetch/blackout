import type { QueryCommercePages } from '@farfetch/blackout-client';

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
  spacecode?: string;
  channel?: string;
};

export type CommercePagesParams = Omit<
  QueryCommercePages,
  'pageIndex' | 'pageSize'
>;
