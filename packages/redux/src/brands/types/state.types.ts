import type { Brand, Brands } from '@farfetch/blackout-client/brands/types';
import type { Error } from '@farfetch/blackout-client/types';

// Override `Brands` to have entries as an array of ids
export type BrandsResultNormalized = Omit<Brands, 'entries'> & {
  entries: Brand['id'][];
};

export type State = {
  error: Record<Brand['id'] | string, Error | undefined>;
  hash: string | null;
  isLoading: Record<Brand['id'] | string, boolean | undefined>;
  // A single brand has no result, as it's normalized and it's a single entity
  // Multiple brands have the `BrandsResultNormalized` structure under a `hash`
  result: Record<Brand['id'] | string, BrandsResultNormalized>;
};
