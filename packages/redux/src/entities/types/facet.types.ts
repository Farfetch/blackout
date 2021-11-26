import type { FacetValue } from '@farfetch/blackout-client/products/types';

export type FacetEntity = FacetValue & {
  id: string;
  parentId: string;
};
