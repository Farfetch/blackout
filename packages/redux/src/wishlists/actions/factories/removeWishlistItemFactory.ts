import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteWishlistItem,
  toBlackoutError,
  Wishlist,
  WishlistItem,
} from '@farfetch/blackout-client';
import { getWishlistId, getWishlistItem } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type { RemoveWishlistItemAction } from '../../types';
import type { WishlistItemHydrated } from '../../../entities/types';

/**
 * @param wishlistItemId - Wishlist item id.
 * @param config         - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to remove a
 * wishlist item with given id.
 *
 * @param deleteWishlistItem - Delete wishlist item client.
 *
 * @returns Thunk factory.
 */
const removeWishlistItemFactory =
  (deleteWishlistItem: DeleteWishlistItem) =>
  (wishlistItemId: WishlistItem['id'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveWishlistItemAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Wishlist | undefined> => {
    let wishlistItem: WishlistItemHydrated | undefined;
    try {
      const state = getState();
      const wishlistId = getWishlistId(state);

      if (!wishlistId) {
        throw new Error('No wishlist id is set');
      }

      wishlistItem = getWishlistItem(state, wishlistItemId);

      dispatch({
        meta: {
          productId: wishlistItem?.product?.id,
          wishlistItemId,
        },
        type: actionTypes.REMOVE_WISHLIST_ITEM_REQUEST,
      });

      const result = await deleteWishlistItem(
        wishlistId,
        wishlistItemId,
        config,
      );
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
        type: actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
        meta: {
          productId: wishlistItem?.product?.id,
          wishlistItemId,
          wishlistId,
          ...config,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        meta: {
          productId: wishlistItem?.product?.id,
          wishlistItemId,
        },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_WISHLIST_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default removeWishlistItemFactory;
