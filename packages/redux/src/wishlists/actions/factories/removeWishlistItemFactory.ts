import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteWishlistItem,
  toBlackoutError,
  type Wishlist,
  type WishlistItem,
} from '@farfetch/blackout-client';
import { getWishlistId, getWishlistItem } from '../../selectors/index.js';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';
import type {
  RemoveWishlistItemAction,
  WishlistItemActionMetadata,
} from '../../types/index.js';
import type { WishlistItemDenormalized } from '../../../entities/types/index.js';

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
  (
    wishlistItemId: WishlistItem['id'],
    metadata?: WishlistItemActionMetadata,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<RemoveWishlistItemAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Wishlist | undefined> => {
    let wishlistItem: WishlistItemDenormalized | undefined;

    try {
      const state = getState();
      const wishlistId = getWishlistId(state);

      if (!wishlistId) {
        throw new Error('No wishlist id is set');
      }

      wishlistItem = getWishlistItem(state, wishlistItemId);

      dispatch({
        meta: {
          ...metadata,
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

      await dispatch({
        payload: normalize(
          { ...result, items: newItems },
          { items: [wishlistItemSchema] },
        ),
        type: actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
        meta: {
          ...metadata,
          productId: wishlistItem?.product?.id,
          wishlistItemId,
          wishlistId,
          ...config,
        },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: {
          ...metadata,
          productId: wishlistItem?.product?.id,
          wishlistItemId,
        },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_WISHLIST_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeWishlistItemFactory;
