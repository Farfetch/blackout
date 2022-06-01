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
