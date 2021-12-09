import * as actionTypes from '../../actionTypes';
import { getWishlistId, getWishlistItem } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type {
  PatchWishlistItem,
  PatchWishlistItemData,
  Wishlist,
  WishlistItem,
} from '@farfetch/blackout-client/wishlists/types';
import type { UpdateWishlistItemAction } from '../../types';

/**
 * @callback UpdateWishlistItemThunkFactory
 * @param {string} wishlistItemId - Wishlist item id.
 * @param {object} data - Data to update the wishlist item.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client
 * to update a wishlist item with given `data`.
 *
 * @memberof module:wishlists/actions/factories
 *
 * @param {Function} patchWishlistItem - Patch wishlist item client.
 *
 * @returns {UpdateWishlistItemThunkFactory} Thunk factory.
 */
const updateWishlistItemFactory =
  (patchWishlistItem: PatchWishlistItem) =>
  (
    wishlistItemId: WishlistItem['id'],
    data: PatchWishlistItemData,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: Dispatch<UpdateWishlistItemAction>,
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
      type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST,
    });

    try {
      const result = await patchWishlistItem(
        wishlistId,
        wishlistItemId,
        data,
        config,
      );
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      dispatch({
        meta: {
          ...data,
          productId: wishlistItem?.product?.id,
          wishlistItemId,
        },
        payload: normalize(
          { ...result, items: newItems },
          { items: [wishlistItemSchema] },
        ),
        type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: {
          productId: wishlistItem?.product?.id,
          wishlistItemId,
        },
        payload: { error },
        type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default updateWishlistItemFactory;
