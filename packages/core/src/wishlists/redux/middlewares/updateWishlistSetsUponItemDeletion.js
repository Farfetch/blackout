import { DELETE_WISHLIST_ITEM_SUCCESS } from '../actionTypes';
import { doGetWishlistSets } from '../actions';
import { getUser, getUserIsGuest } from '../../../entities/redux/selectors';
import { getWishlistsSets as getWishlistsSetsClient } from '../../client';

/**
 * Middleware to update the wishlist sets if a wishlist item is deleted.
 *
 * @function updateWishlistSetsUponItemDeletion
 * @memberof module:wishlists/middlewares
 *
 * @param {object} store - Redux store at the moment.
 *
 * @returns {Function} Redux middleware.
 */
export default store => next => action => {
  if (action.type === DELETE_WISHLIST_ITEM_SUCCESS) {
    const user = getUser(store.getState());
    const isGuestUser = getUserIsGuest(user);

    if (!isGuestUser) {
      const getWishlistSets = doGetWishlistSets(getWishlistsSetsClient);

      store.dispatch(getWishlistSets());
    }
  }

  return next(action);
};
