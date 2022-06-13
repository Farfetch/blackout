import type { FacetEntity } from './facet.types';
import type {
  FacetGroup,
  Listing as OriginalListing,
  Set as OriginalSet,
} from '@farfetch/blackout-client';
import type { ProductEntity } from './product.types';

export type FacetGroupsNormalized = Array<
  Omit<FacetGroup, 'values'> & {
    values: FacetEntity['id'][][];
  }
>;

type ProductsNormalized = Omit<OriginalListing['products'], 'entries'> &
  Omit<OriginalSet['products'], 'entries'> & {
    entries: ProductEntity['id'][];
  };

export type ProductsListEntity = Omit<
  OriginalListing,
  'products' | 'facetGroups'
> &
  Omit<OriginalSet, 'products' | 'facetGroups'> & {
    // Entities
    products: ProductsNormalized;
    facetGroups: FacetGroupsNormalized;
    // Properties
    hash: string;
  };
