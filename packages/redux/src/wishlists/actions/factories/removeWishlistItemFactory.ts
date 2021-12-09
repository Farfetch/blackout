import * as actionTypes from '../../actionTypes';
import { getWishlistId, getWishlistItem } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem';
import type {
  DeleteWishlistItem,
  Wishlist,
  WishlistItem,
} from '@farfetch/blackout-client/wishlists/types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type { RemoveWishlistItemAction } from '../../types';

/**
 * @callback RemoveWishlistItemThunkFactory
 * @param {string} wishlistItemId - Wishlist item id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client
 * to remove a wishlist item with given id.
 *
 * @function removeWishlistItemFactory
 * @memberof module:wishlists/actions/factories
 *
 * @param {Function} deleteWishlistItem - Delete wishlist item client.
 *
 * @returns {RemoveWishlistItemThunkFactory} Thunk factory.
 */
const removeWishlistItemFactory =
  (deleteWishlistItem: DeleteWishlistItem) =>
  (wishlistItemId: WishlistItem['id'], config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<RemoveWishlistItemAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Wishlist | undefined> => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    if (!wishlistId) {
      throw new Error('No wishlist id is set');
    }

    const wishlistItem = getWishlistItem(state, wishlistItemId);

    dispatch({
      meta: {
        productId: wishlistItem?.product?.id,
        wishlistItemId,
      },
      type: actionTypes.REMOVE_WISHLIST_ITEM_REQUEST,
    });

    try {
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
        payload: { error },
        type: actionTypes.REMOVE_WISHLIST_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default removeWishlistItemFactory;
