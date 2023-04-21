import * as actionTypes from '../actionTypes.js';
import { fetchWishlistSets } from '../actions/index.js';
import { getUser, getUserIsGuest } from '../../users/selectors.js';
import type {
  FetchWishlistSetsAction,
  RemoveWishlistItemAction,
} from '../types/index.js';
import type { Middleware } from 'redux';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

type UpdateWishlistSetsUponItemDeletionParams = {
  // Redux action dispatch.
  dispatch: ThunkDispatch<StoreState, unknown, FetchWishlistSetsAction>;
  // Returns the current redux state.
  getState: () => StoreState;
};

/**
 * Middleware to update the wishlist sets if a wishlist item is deleted.
 *
 * @param store - Redux store at the moment.
 *
 * @returns Redux middleware.
 */
const updateWishlistSetsUponItemDeletion: Middleware =
  ({ dispatch, getState }: UpdateWishlistSetsUponItemDeletionParams) =>
  next =>
  (action: RemoveWishlistItemAction) => {
    if (action.type === actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS) {
      const user = getUser(getState());
      const isGuestUser = getUserIsGuest(user);
      const userWishlistId = user?.wishlistId;

      if (!isGuestUser && userWishlistId) {
        dispatch(fetchWishlistSets(userWishlistId));
      }
    }

    return next(action);
  };

export default updateWishlistSetsUponItemDeletion;
