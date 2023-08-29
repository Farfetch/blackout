import * as actionTypes from '../../sharedWishlists/actionTypes.js';
import { fetchWishlistSets } from '../../wishlists/actions/index.js';
import { type FetchWishlistSetsAction } from '../../wishlists/types/actions.types.js';
import {
  type GetOptionsArgument,
  getWishlistId,
  type StoreState,
} from '../../index.js';
import { getUser, getUserIsGuest } from '../../users/selectors.js';
import type { AnyAction, Middleware } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

type GetWishlistSetsUponSharedWishlistIdChangesParams = {
  // Redux action dispatch.
  dispatch: ThunkDispatch<
    StoreState,
    GetOptionsArgument,
    FetchWishlistSetsAction
  >;
  // Returns the current redux state.
  getState: () => StoreState;
};

const getWishlistSetsUponSharedWishlistIdChanges: Middleware =
  ({ dispatch, getState }: GetWishlistSetsUponSharedWishlistIdChangesParams) =>
  next =>
  (action: AnyAction) => {
    if (
      action.type === actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS ||
      action.type === actionTypes.CREATE_SHARED_WISHLIST_SUCCESS
    ) {
      const state = getState();
      const user = getUser(state);
      const isGuestUser = getUserIsGuest(user);
      const wishlistId = getWishlistId(state);

      if (!isGuestUser) {
        dispatch(fetchWishlistSets(wishlistId as string));
      }
    }

    return next(action);
  };

export default getWishlistSetsUponSharedWishlistIdChanges;
