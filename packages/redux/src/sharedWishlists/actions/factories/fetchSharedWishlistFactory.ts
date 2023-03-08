import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetSharedWishlist,
  type SharedWishlist,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist.js';
import type { Dispatch } from 'redux';
import type { FetchSharedWishlistAction } from '../../types/index.js';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchWishlistFactory;
