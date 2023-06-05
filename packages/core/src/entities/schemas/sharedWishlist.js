import { schema } from 'normalizr';
import sharedWishlistItem from './sharedWishlistItem';

export default new schema.Entity('sharedWishlists', {
  items: [sharedWishlistItem],
});
