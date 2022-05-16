import { schema } from 'normalizr';
import facet, { getId } from './facet';
import product from './product';

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
        const facetGroup = facetGroups.find(
          ({ type, deep }) =>
            type === filterSegment.type && deep === filterSegment.deep,
        );
        const facet = facetGroup.values[0].find(
          ({ value }) => value === filterSegment.value,
        );

        return {
          ...filterSegment,
          description: facet.description,
          facetId: getId(facet, facetGroup),
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
