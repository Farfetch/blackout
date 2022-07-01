import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostWishlistItem,
  PostWishlistItemData,
  toBlackoutError,
  Wishlist,
} from '@farfetch/blackout-client';
import { getWishlistId } from '../../selectors';
import { normalize } from 'normalizr';
import { omit } from 'lodash';
import wishlistItemSchema from '../../../entities/schemas/wishlistItem';
import type {
  AddWishlistItemAction,
  PostWishlistItemActionData,
} from '../../types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @param data   - Item data used to add it to wishlist.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
  (data: PostWishlistItemActionData, config?: Config) =>
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
        meta: { productId: data.productId },
        type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
      });

      const dataToSend: PostWishlistItemData = omit(data, [
        'affiliation',
        'coupon',
        'from',
        'position',
        'value',
      ]);

      const result = await postWishlistItem(wishlistId, dataToSend, config);
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      dispatch({
        meta: { ...data, wishlistId },
        payload: normalize(
          { ...result, items: newItems },
          { items: [wishlistItemSchema] },
        ),
        type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId: data.productId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.ADD_WISHLIST_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default addWishlistItemFactory;
