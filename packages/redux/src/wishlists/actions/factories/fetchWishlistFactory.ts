import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetWishlist,
  toBlackoutError,
  type Wishlist,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem.js';
import type { Dispatch } from 'redux';
import type { FetchWishlistAction } from '../../types/index.js';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

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

      await dispatch({
        payload: normalize(
          { ...result, items: newItems },
          { items: [wishlistItemSchema] },
        ),
        type: actionTypes.FETCH_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_WISHLIST_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchWishlistFactory;
