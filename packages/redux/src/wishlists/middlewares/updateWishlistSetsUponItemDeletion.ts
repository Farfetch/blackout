import { fetchWishlistSets } from '../actions';
import { getUser, getUserIsGuest } from '../../entities/selectors';
import { REMOVE_WISHLIST_ITEM_SUCCESS } from '../actionTypes';
import type {
  FetchWishlistSetsAction,
  RemoveWishlistItemAction,
} from '../types';
import type { Middleware } from 'redux';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Middleware to update the wishlist sets if a wishlist item is deleted.
 *
 * @memberof module:wishlists/middlewares
 *
 * @param {object} store - Redux store at the moment.
 * @param {Function} store.dispatch - Redux action dispatch.
 * @param {Function} store.getState - Returns the current redux state.
 *
 * @returns {Function} Redux middleware.
 */
const updateWishlistSetsUponItemDeletion: Middleware =
  ({
    dispatch,
    getState,
  }: {
    dispatch: ThunkDispatch<StoreState, unknown, FetchWishlistSetsAction>;
    getState: () => StoreState;
  }) =>
  next =>
  (action: RemoveWishlistItemAction) => {
    if (action.type === REMOVE_WISHLIST_ITEM_SUCCESS) {
      const user = getUser(getState());
      const isGuestUser = getUserIsGuest(user);

      if (!isGuestUser) {
        dispatch(fetchWishlistSets());
      }
    }

    return next(action);
  };

export default updateWishlistSetsUponItemDeletion;
