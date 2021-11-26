import { schema } from 'normalizr';

// Despite the `wishlists` schema have no direct relation with `wishlistSets`,
// it's impossible for a wishlist set to live without a wishlist and its respective items

export default new schema.Entity(
  'wishlistSets',
  {
    // no need of anything here, because
    // `wishlistSetItems[n].wishlistItemId` is already a reference to a wishlist item,
    // which necessarily already exists
  },
  {
    idAttribute: 'setId',
    processStrategy: ({ setId, ...rest }) => ({
      ...rest,
      id: setId,
    }),
  },
);
