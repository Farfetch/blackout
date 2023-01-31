import { schema } from 'normalizr';
import wishlistItem from './wishlistItem';

export default new schema.Entity(
  'wishlist',
  { items: [wishlistItem] },
  {
    processStrategy: value => {
      // Pass `productImgQueryParam` to the `product`
      const { productImgQueryParam, items, ...rest } = value;
      const newItems =
        items &&
        items.map(item => ({
          ...item,
          productImgQueryParam,
        }));

      return { items: newItems, ...rest };
    },
  },
);
