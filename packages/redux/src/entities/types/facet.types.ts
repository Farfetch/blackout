import type { FacetGroup, FacetValue } from '@farfetch/blackout-client';

export type FacetEntity = Omit<FacetValue, 'parentId'> & {
  id: string;
  parentId: string;
  groupType: FacetGroup['type'];
};

export type FacetEntityWithChildren = FacetEntity & {
  children: FacetEntity[] | undefined;
};
