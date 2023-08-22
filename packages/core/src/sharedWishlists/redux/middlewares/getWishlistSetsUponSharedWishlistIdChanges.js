import {
  CREATE_SHARED_WISHLIST_SUCCESS,
  REMOVE_SHARED_WISHLIST_SUCCESS,
} from '../actionTypes';
import { doGetWishlistSets } from '../../../wishlists/redux/actions';
import { getUser, getUserIsGuest } from '../../../entities/redux/selectors';
import { getWishlistsSets as getWishlistsSetsClient } from '../../../wishlists/client';

const getWishlistSets = doGetWishlistSets(getWishlistsSetsClient);

/**
 * Middleware to get the updated wishlist sets if a shared wishlist has been created or deleted.
 *
 * @function getWishlistSetsUponSharedWishlistIdChanges
 * @memberof module:sharedWishlists/middlewares
 *
 * @param {object} store - Redux store at the moment.
 *
 * @returns {Function} Redux middleware.
 */
export default store => next => action => {
  if (
    action.type === REMOVE_SHARED_WISHLIST_SUCCESS ||
    action.type === CREATE_SHARED_WISHLIST_SUCCESS
  ) {
    const state = store.getState();
    const user = getUser(state);
    const isGuestUser = getUserIsGuest(user);

    if (!isGuestUser) {
      store.dispatch(getWishlistSets());
    }
  }
  return next(action);
};
