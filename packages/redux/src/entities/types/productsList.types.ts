import type { FacetEntity } from './facet.types.js';
import type {
  FacetGroup,
  FilterSegment,
  ProductListing,
  ProductSet,
} from '@farfetch/blackout-client';
import type { ProductEntity } from './product.types.js';

export type FacetGroupsNormalized = Array<
  Omit<FacetGroup, 'values'> & {
    values: FacetEntity['id'][][];
  }
>;

export type FilterSegmentNormalized = FilterSegment & {
  facetId: FacetEntity['id'];
};

type ProductsNormalized = Omit<ProductListing['products'], 'entries'> &
  Omit<ProductSet['products'], 'entries'> & {
    entries: ProductEntity['id'][];
  };

export type ProductsListEntity = Omit<
  ProductListing,
  'products' | 'facetGroups' | 'filterSegments'
> &
  Omit<
    ProductSet,
    'products' | 'facetGroups' | 'filterSegments' | 'id' | 'name'
  > & {
    // Entities
    products: ProductsNormalized;
    facetGroups: FacetGroupsNormalized;
    // Properties
    hash: string;
    filterSegments: FilterSegmentNormalized[];
    id?: ProductSet['id'];
  };

export type FacetGroupDenormalized = Omit<FacetGroup, 'values'> & {
  values: FacetEntity[];
};

export type HierarchicalFacet = FacetEntity & {
  children: FacetEntity[] | undefined;
};
