import type { FacetValue } from '@farfetch/blackout-client';

export type FacetEntity = FacetValue & {
  id: string;
  parentId: string;
};
