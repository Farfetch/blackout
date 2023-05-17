import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PatchWishlistItem,
  type PatchWishlistItemData,
  toBlackoutError,
  type Wishlist,
  type WishlistItem,
} from '@farfetch/blackout-client';
import { getWishlistItem } from '../../selectors/index.js';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';
import type {
  UpdateWishlistItemAction,
  WishlistItemActionMetadata,
} from '../../types/index.js';
import type { WishlistItemDenormalized } from '../../../entities/types/index.js';

/**
 * Creates a thunk factory configured with the specified client to update a
 * wishlist item with given `data`.
 *
 * @param patchWishlistItem - Patch wishlist item client.
 *
 * @returns Thunk factory.
 */
const updateWishlistItemFactory =
  (patchWishlistItem: PatchWishlistItem) =>
  (
    wishlistId: Wishlist['id'],
    wishlistItemId: WishlistItem['id'],
    data: PatchWishlistItemData,
    metadata?: WishlistItemActionMetadata,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<UpdateWishlistItemAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Wishlist | undefined> => {
    let wishlistItem: WishlistItemDenormalized | undefined;

    try {
      const state = getState();

      wishlistItem = getWishlistItem(state, wishlistItemId);

      dispatch({
        meta: {
          ...metadata,
          productId: wishlistItem?.product?.id,
          wishlistItemId,
        },
        type: actionTypes.UPDATE_WISHLIST_ITEM_REQUEST,
      });

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

      await dispatch({
        meta: {
          ...metadata,
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: {
          ...metadata,
          productId: wishlistItem?.product?.id,
          wishlistItemId,
        },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateWishlistItemFactory;
