import * as actionTypes from '../../actionTypes';
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
import type {
  PostWishlistItem,
  PostWishlistItemData,
  Wishlist,
} from '@farfetch/blackout-client/wishlists/types';

/**
 * @callback AddWishlistItemThunkFactory
 * @param {object} data - Item data used to add it to wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to add
 * an item with the given data to the wishlist.
 *
 * @memberof module:wishlists/actions
 *
 * @param {Function} postWishlistItem - Post wishlist item client.
 *
 * @returns {AddWishlistItemThunkFactory} Thunk factory.
 */
const addWishlistItemFactory =
  (postWishlistItem: PostWishlistItem) =>
  (data: PostWishlistItemActionData, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<AddWishlistItemAction>,
    getState: () => StoreState,
    {
      getOptions = ({ productImgQueryParam }) => ({ productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Wishlist | undefined> => {
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

    try {
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
        payload: { error },
        type: actionTypes.ADD_WISHLIST_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default addWishlistItemFactory;
