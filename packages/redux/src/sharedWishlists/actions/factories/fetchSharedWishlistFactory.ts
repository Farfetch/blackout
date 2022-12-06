import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSharedWishlist,
  SharedWishlist,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist';
import type { Dispatch } from 'redux';
import type { FetchSharedWishlistAction } from '../../types';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * Creates a thunk factory configured with the specified client to fetch shared
 * wishlist with given id.
 *
 * @param getSharedWishlist - Get shared wishlist client.
 *
 * @returns Thunk factory.
 */
const fetchWishlistFactory =
  (getSharedWishlist: GetSharedWishlist) =>
  (sharedWishlistId: SharedWishlist['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchSharedWishlistAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<SharedWishlist> => {
    try {
      dispatch({
        type: actionTypes.FETCH_SHARED_WISHLIST_REQUEST,
      });

      const result = await getSharedWishlist(sharedWishlistId, config);
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
        type: actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
      });

      throw error;
    }
  };

export default fetchWishlistFactory;
