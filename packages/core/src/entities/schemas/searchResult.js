import { schema } from 'normalizr';
import facet from './facet';
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
        productImgQueryParam,
        products,
        wishList, // omit this, it makes no sense to let it pass
        ...rest
      } = value;
      const newEntries = products.entries.map(entry => ({
        ...entry,
        productImgQueryParam,
      }));
      const searchResult = {
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
