import type { GetProductGroupingPropertiesQuery } from '@farfetch/blackout-client';

export type GenerateProductGroupingPropertiesHash = (
  // Get product grouping properties request query.
  query?: GetProductGroupingPropertiesQuery,
) => string;
