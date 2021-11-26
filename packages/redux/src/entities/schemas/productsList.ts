import { schema } from 'normalizr';
import facet from './facet';
import product from './product';

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
        productImgQueryParam,
        products,
        wishList, // omit this, it makes no sense to let it pass
        ...rest
      } = value;
      const newEntries = products.entries.map((entry: any) => ({
        ...entry,
        productImgQueryParam,
      }));
      const productsList = {
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
