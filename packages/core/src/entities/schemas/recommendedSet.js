import { schema } from 'normalizr';
import facet from './facet';
import product from './product';

export default new schema.Entity('recommendedSets', {
  products: { entries: [product] },
  facetGroups: [
    {
      values: [[facet]],
    },
  ],
});
