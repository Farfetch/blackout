import { schema } from 'normalizr';
import bagItem from './bagItem';
import bagOperation from './bagOperation';

export default new schema.Entity(
  'bag',
  { items: [bagItem], bagOperations: [bagOperation] },
  {
    processStrategy: value => {
      // Pass `productImgQueryParam` to `product`
      const { productImgQueryParam, items, ...rest } = value;
      const newItems = items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      return { items: newItems, ...rest };
    },
  },
);
