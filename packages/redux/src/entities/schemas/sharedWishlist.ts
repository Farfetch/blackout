import { schema } from 'normalizr';
import sharedWishlistItem from './sharedWishlistItem.js';

export default new schema.Entity('sharedWishlists', {
  items: [sharedWishlistItem],
});
