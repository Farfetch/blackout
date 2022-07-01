import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetWishlist,
  toBlackoutError,
  Wishlist,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem';
import type { Dispatch } from 'redux';
import type { FetchWishlistAction } from '../../types';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @param wishlistId - Wishlist id.
 * @param config     - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch wishlist
 * with given id.
 *
 * @param getWishlist - Get wishlist client.
 *
 * @returns Thunk factory.
 */
const fetchWishlistFactory =
  (getWishlist: GetWishlist) =>
  (wishlistId: Wishlist['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchWishlistAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Wishlist | undefined> => {
    try {
      dispatch({
        type: actionTypes.FETCH_WISHLIST_REQUEST,
      });

      const result = await getWishlist(wishlistId, config);
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      dispatch({
        payload: normalize(
          { ...result, items: newItems },
          { items: [wishlistItemSchema] },
        ),
        type: actionTypes.FETCH_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_WISHLIST_FAILURE,
      });

      throw error;
    }
  };

export default fetchWishlistFactory;
