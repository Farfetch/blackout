import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostSharedWishlist,
  type PostSharedWishlistData,
  type SharedWishlist,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist.js';
import type { CreateSharedWishlistAction } from '../../types/index.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to create a new
 * shared wishlist.
 *
 * @param postSharedWishlist - Post shared wishlists set client.
 *
 * @returns Thunk factory.
 */
const createSharedWishlistFactory =
  (postSharedWishlist: PostSharedWishlist) =>
  (data: PostSharedWishlistData, config?: Config) =>
  async (
    dispatch: Dispatch<CreateSharedWishlistAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<SharedWishlist> => {
    try {
      dispatch({
        type: actionTypes.CREATE_SHARED_WISHLIST_REQUEST,
      });

      const result = await postSharedWishlist(data, config);
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
        type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_SHARED_WISHLIST_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createSharedWishlistFactory;
