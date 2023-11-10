import { schema } from 'normalizr';
import facet, { getId } from './facet.js';
import product from './product.js';
import type {
  FacetGroup,
  FilterSegment,
  Product,
} from '@farfetch/blackout-client';
import type { FacetGroupWithListingHash } from '../index.js';

const SIZE_BY_CATEGORY_TYPE = 24;
const SIZES_TYPE = 9;
const ATTRIBUTES_TYPE = 7;

// This entity should be used to aggregate products lists (listings and sets)
export default new schema.Entity(
  'productsLists',
  {
    products: { entries: [product] },
    facetGroups: [
      {
        values: [[facet]],
      },
    ],
  },
  {
    idAttribute: ({ hash }) => hash,
    processStrategy: value => {
      const {
        facetGroups,
        filterSegments,
        hash,
        productImgQueryParam,
        products,
        wishList, // omit this, it makes no sense to let it pass
        ...rest
      } = value;
      const newEntries = products.entries.map((entry: Product) => ({
        ...entry,
        productImgQueryParam,
      }));

      // Add the hash in the facetGroups for creating facets id in normalisation
      const newFacetGroups = facetGroups.map((facetGroup: FacetGroup) => ({
        ...facetGroup,
        hash,
      }));

      // Hydrate the `filterSegment` with the respective facet id to allow a direct mapping
      // This presumes that all facet IDs are unique values, which might not be the case for
      // `sizes` when the catalog has misconfigured products
      const newFilterSegments = filterSegments.map(
        (filterSegment: FilterSegment) => {
          const filteredFacetGroups: FacetGroup[] = newFacetGroups.filter(
            ({ type, deep }: FacetGroup) => {
              // There's no 1:1 relation between the "size" selected and the "sizes by category"
              // facetGroup, so when we have type 24 (size by category), we know we must find
              // the type 9 (sizes) in the filterSegments.
              if (type === SIZE_BY_CATEGORY_TYPE) {
                return filterSegment.type === SIZES_TYPE;
              }

              return type === filterSegment.type && deep === filterSegment.deep;
            },
          );

          // If the filter segment is an ProductVariantAttribute, filteredFacetGroups will be an array with
          // all attributes so the flow is a little different.
          if (filterSegment.type === ATTRIBUTES_TYPE) {
            let facetIndex: number | undefined;
            const facetGroup = filteredFacetGroups.find(facet =>
              facet.values[0]?.find(({ value }, i) => {
                if (value === filterSegment.value) {
                  facetIndex = i;

                  return true;
                }

                return false;
              }),
            );
            const facet =
              typeof facetIndex === 'number'
                ? facetGroup?.values[0]?.[facetIndex]
                : undefined;

            return {
              ...filterSegment,
              description: filterSegment.description || facet?.description,
              facetId: facet
                ? getId(facet, facetGroup as FacetGroupWithListingHash)
                : undefined,
            };
          }

          const allFacetGroupValues = filteredFacetGroups.reduce<
            FacetGroup['values'][number]
          >((acc, facetGroup) => {
            return [...acc, ...facetGroup.values.flat()];
          }, []);

          const facet = allFacetGroupValues?.find(
            ({ value }) => value === filterSegment.value,
          );

          return {
            ...filterSegment,
            description: filterSegment.description || facet?.description,
            facetId: facet
              ? getId(
                  facet,
                  filteredFacetGroups?.[0] as FacetGroupWithListingHash,
                )
              : undefined,
          };
        },
      );
      const productsList = {
        facetGroups: newFacetGroups,
        filterSegments: newFilterSegments,
        hash,
        products: {
          ...products,
          entries: newEntries,
        },
        ...rest,
      };

      return productsList;
    },
  },
);
