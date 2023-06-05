import {
  ADD_ITEM_TO_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_ITEM_SUCCESS,
} from '../../../wishlists/redux/actionTypes';
import { doUpdateSharedWishlist } from '../actions';
import { getSharedWishlistId } from '../selectors';
import { getUser, getUserIsGuest } from '../../../entities/redux/selectors';
import { putSharedWishlist as putSharedWishlistClient } from '../../client';

const updateSharedWishlist = doUpdateSharedWishlist(putSharedWishlistClient);

/**
 * Middleware to update the shared wishlist if a wishlist item is added, edited or deleted.
 *
 * @function updateSharedWishlistUponItemsChanges
 * @memberof module:sharedWishlists/middlewares
 *
 * @param {object} store - Redux store at the moment.
 *
 * @returns {Function} Redux middleware.
 */
export default store => next => action => {
  if (
    action.type === UPDATE_WISHLIST_ITEM_SUCCESS ||
    action.type === ADD_ITEM_TO_WISHLIST_SUCCESS ||
    action.type === DELETE_WISHLIST_ITEM_SUCCESS
  ) {
    const user = getUser(store.getState());
    const isGuestUser = getUserIsGuest(user);

    if (!isGuestUser) {
      const sharedWishlistId = getSharedWishlistId(store.getState());

      store.dispatch(updateSharedWishlist(sharedWishlistId));
    }
  }
  return next(action);
};
