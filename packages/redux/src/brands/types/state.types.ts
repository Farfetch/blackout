import type { BlackoutError, Brand, Brands } from '@farfetch/blackout-client';

// Override `Brands` to have entries as an array of ids
export type BrandsResultNormalized = Omit<Brands, 'entries'> & {
  entries: Brand['id'][];
};

export type BrandsState = {
  error: Record<Brand['id'] | string, BlackoutError | undefined>;
  hash: string | null;
  isLoading: Record<Brand['id'] | string, boolean | undefined>;
  // A single brand has no result, as it's normalized and it's a single entity
  // Multiple brands have the `BrandsResultNormalized` structure under a `hash`
  result: Record<Brand['id'] | string, BrandsResultNormalized>;
};
