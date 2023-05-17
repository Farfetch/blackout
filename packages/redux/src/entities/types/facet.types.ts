import type { FacetValue } from '@farfetch/blackout-client';

export type FacetEntity = Omit<FacetValue, 'parentId'> & {
  id: string;
  parentId: string;
};

export type FacetEntityWithChildren = FacetEntity & {
  children: FacetEntity[] | undefined;
};
