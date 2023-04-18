import type { GetProductGroupingQuery } from '@farfetch/blackout-client';

export type GenerateProductGroupingHash = (
  // Get product grouping request query.
  query?: GetProductGroupingQuery,
) => string;
