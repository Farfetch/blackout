import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostWishlistItem,
  type PostWishlistItemData,
  toBlackoutError,
  type Wishlist,
} from '@farfetch/blackout-client';
import { getWishlistId } from '../../selectors/index.js';
import { normalize } from 'normalizr';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem.js';
import type {
  AddWishlistItemAction,
  WishlistItemActionMetadata,
} from '../../types/index.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to add an item with
 * the given data to the wishlist.
 *
 * @param postWishlistItem - Post wishlist item client.
 *
 * @returns Thunk factory.
 */
const addWishlistItemFactory =
  (postWishlistItem: PostWishlistItem) =>
  (
    data: PostWishlistItemData,
    metadata?: WishlistItemActionMetadata,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<AddWishlistItemAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Wishlist | undefined> => {
    try {
      const state = getState();
      const wishlistId = getWishlistId(state);

      // Do not add product if there's no wishlist set yet
      if (!wishlistId) {
        throw new Error('No wishlist id is set');
      }

      dispatch({
        meta: { ...metadata, productId: data.productId },
        type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
      });

      const result = await postWishlistItem(wishlistId, data, config);
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      await dispatch({
        meta: { ...metadata, ...data, wishlistId },
        payload: normalize(
          { ...result, items: newItems },
          { items: [wishlistItemSchema] },
        ),
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { ...metadata, productId: data.productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.ADD_WISHLIST_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default addWishlistItemFactory;
