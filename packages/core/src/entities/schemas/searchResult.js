import { schema } from 'normalizr';
import facet, { getId } from './facet';
import product from './product';

const SIZE_BY_CATEGORY_TYPE = 24;
const SIZES_TYPE = 9;
const ATTRIBUTES_TYPE = 7;

export default new schema.Entity(
  'searchResults',
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
        productImgQueryParam,
        products,
        wishList, // omit this, it makes no sense to let it pass
        ...rest
      } = value;
      const newEntries = products.entries.map(entry => ({
        ...entry,
        productImgQueryParam,
      }));
      // Hydrate the `filterSegment` with the respective facet id to allow a direct mapping
      // This presumes that all facet IDs are unique values, which might not be the case for
      // `sizes` when the catalog has misconfigured products
      const newFilterSegments = filterSegments.map(filterSegment => {
        const filteredFacetGroups = facetGroups.filter(({ type, deep }) => {
          // There's no 1:1 relation between the "size" selected and the "sizes by category"
          // facetGroup, so when we have type 24 (size by category), we know we must find
          // the type 9 (sizes) in the filterSegments.
          if (type === SIZE_BY_CATEGORY_TYPE) {
            return filterSegment.type === SIZES_TYPE;
          }

          return type === filterSegment.type && deep === filterSegment.deep;
        });

        // If the filter segment is an Attribute, filteredFacetGroups will be an array with
        // all attributes so the flow is a little different.
        if (filterSegment.type === ATTRIBUTES_TYPE) {
          let facetIndex;
          const facetGroup = filteredFacetGroups.find(facet =>
            facet.values[0].find(({ value }, i) => {
              if (value === filterSegment.value) {
                facetIndex = i;

                return true;
              }

              return false;
            }),
          );
          const facet = facetGroup.values[0][facetIndex];

          return {
            ...filterSegment,
            description: filterSegment.description || facet?.description,
            facetId: facet ? getId(facet, facetGroup) : undefined,
          };
        }

        const facet = filteredFacetGroups?.[0]?.values[0].find(
          ({ value }) => value === filterSegment.value,
        );

        return {
          ...filterSegment,
          description: filterSegment.description || facet?.description,
          facetId: facet ? getId(facet, filteredFacetGroups?.[0]) : undefined,
        };
      });

      const searchResult = {
        facetGroups,
        filterSegments: newFilterSegments,
        products: {
          ...products,
          entries: newEntries,
        },
        ...rest,
      };

      return searchResult;
    },
  },
);
