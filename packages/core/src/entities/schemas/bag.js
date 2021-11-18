import { schema } from 'normalizr';
import bagItem from './bagItem';

export default new schema.Entity(
  'bag',
  { items: [bagItem] },
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
