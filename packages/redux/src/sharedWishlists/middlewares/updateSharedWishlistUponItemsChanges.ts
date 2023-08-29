import * as actionTypes from '../../wishlists/actionTypes.js';
import {
  getSharedWishlistId,
  type UpdateSharedWishlistAction,
} from '../index.js';
import { getUser, getUserIsGuest } from '../../users/selectors.js';
import { updateSharedWishlist } from '../actions/index.js';
import type { AnyAction, Middleware } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../index.js';
import type { ThunkDispatch } from 'redux-thunk';

type UpdateSharedWishlistUponItemsChangesParams = {
  // Redux action dispatch.
  dispatch: ThunkDispatch<
    StoreState,
    GetOptionsArgument,
    UpdateSharedWishlistAction
  >;
  // Returns the current redux state.
  getState: () => StoreState;
};

const updateSharedWishlistUponItemsChanges: Middleware =
  ({ dispatch, getState }: UpdateSharedWishlistUponItemsChangesParams) =>
  next =>
  (action: AnyAction) => {
    if (
      action.type === actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS ||
      action.type === actionTypes.ADD_WISHLIST_ITEM_SUCCESS ||
      action.type === actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS ||
      action.type === actionTypes.UPDATE_WISHLIST_SET_SUCCESS
    ) {
      const state = getState();
      const user = getUser(state);
      const isGuestUser = getUserIsGuest(user);

      if (!isGuestUser) {
        const sharedWishlistId = getSharedWishlistId(state);

        dispatch(updateSharedWishlist(sharedWishlistId as string));
      }
    }

    return next(action);
  };

export default updateSharedWishlistUponItemsChanges;
