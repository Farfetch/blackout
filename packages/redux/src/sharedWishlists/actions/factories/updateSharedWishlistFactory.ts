import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PutSharedWishlist,
  type SharedWishlist,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';
import type { UpdateSharedWishlistAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to update
 * information of a set from the wishlist.
 *
 * @param patchWishlistSet - Patch wishlists set client.
 *
 * @returns Thunk factory.
 */
const updateWishlistSetFactory =
  (putSharedWishlist: PutSharedWishlist) =>
  (sharedWishlistId: SharedWishlist['id'], config?: Config) =>
  async (
    dispatch: Dispatch<UpdateSharedWishlistAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<SharedWishlist> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_SHARED_WISHLIST_REQUEST,
      });

      const result = await putSharedWishlist(sharedWishlistId, config);
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      dispatch({
        payload: normalize(
          { ...result, items: newItems },
          sharedWishlistSchema,
        ),
        type: actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateWishlistSetFactory;
