import {
  type FacetGroup,
  FacetGroupFormat,
  type FilterSegment,
  type Product,
} from '@farfetch/blackout-client';
import { schema } from 'normalizr';
import facet, { getId } from './facet.js';
import product from './product.js';
import type { FacetGroupWithListingHash } from '../index.js';

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
              return type === filterSegment.type && deep === filterSegment.deep;
            },
          );

          const firstFacetGroupForFilterSegment = filteredFacetGroups[0];

          // For filter segments of type range, the matching algorithm with facets
          // is a little bit different since the facet will not contain the same
          // value and valueUpperBound.
          if (
            firstFacetGroupForFilterSegment?.format === FacetGroupFormat.Range
          ) {
            const facet = firstFacetGroupForFilterSegment.values[0]?.[0];

            return {
              ...filterSegment,
              description: `${filterSegment.value}-${filterSegment.valueUpperBound}`,
              facetId: facet
                ? getId(facet, firstFacetGroupForFilterSegment)
                : undefined,
            };
          }

          const allFacetGroupValues = filteredFacetGroups.reduce<
            FacetGroup['values'][number]
          >((acc, facetGroup) => {
            return [...acc, ...facetGroup.values.flat()];
          }, []);

          const facet = allFacetGroupValues?.find(({ value, groupsOn }) => {
            let result = value === filterSegment.value;

            // If the filter segment has a prefix value, compare it with the groupsOn
            // groupsOn is a number but prefixValue is a string, so we need to convert
            // groupsOn to a string.
            if (filterSegment.prefixValue && groupsOn !== 0) {
              result =
                result && filterSegment.prefixValue === groupsOn.toString();
            }

            return result;
          });

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
