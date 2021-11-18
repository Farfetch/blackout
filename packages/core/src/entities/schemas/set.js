import { schema } from 'normalizr';
import facet from './facet';
import product from './product';

export default new schema.Entity(
  'sets',
  {
    products: { entries: [product] },
    facetGroups: [
      {
        values: [[facet]],
      },
    ],
  },
  {
    processStrategy: value => {
      const { productImgQueryParam, products, ...rest } = value;
      const newEntries = products.entries.map(entry => ({
        ...entry,
        productImgQueryParam,
      }));
      const sets = {
        products: {
          ...products,
          entries: newEntries,
        },
        ...rest,
      };

      return sets;
    },
  },
);
