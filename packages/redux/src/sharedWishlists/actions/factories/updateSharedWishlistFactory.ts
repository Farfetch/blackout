import * as actionTypes from '../../actionTypes';
import {
  Config,
  PutSharedWishlist,
  SharedWishlist,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type { UpdateSharedWishlistAction } from '../../types';

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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
      });

      throw error;
    }
  };

export default updateWishlistSetFactory;
