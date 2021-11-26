import { getBagId } from '../../selectors';
import { normalize } from 'normalizr';
import {
  UPDATE_BAG_ITEM_FAILURE,
  UPDATE_BAG_ITEM_REQUEST,
  UPDATE_BAG_ITEM_SUCCESS,
} from '../../actionTypes';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type {
  Bag,
  PatchBagItem,
  PatchBagItemData,
  Query,
} from '@farfetch/blackout-client/bags/types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @typedef {object} UpdateBagItemQuery
 *
 * @alias UpdateBagItemQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * @callback UpdateBagItemThunkFactory
 * @param {number} bagItemId - Bag item id.
 * @param {object} data - Details of the product to update a bag item.
 * @param {number} [data.productId] - Product identifier.
 * @param {number} [data.merchantId] - Merchant identifier.
 * @param {number} [data.quantity] - Bag item quantity.
 * @param {number} [data.size] - Bag item size.
 * @param {number} [data.scale] - Bag item scale.
 * @param {UpdateBagItemQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to update
 * a bag item with given data.
 *
 * @function updateBagItemFactory
 * @memberof module:bags/actions/factories
 *
 * @param {Function} patchBagItem - Patch bag item client.
 *
 * @returns {UpdateBagItemThunkFactory} Thunk factory.
 */
const updateBagItemFactory =
  (patchBagItem: PatchBagItem) =>
  (
    bagItemId: number,
    data: PatchBagItemData,
    query?: Query,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Bag> => {
    const state = getState();
    const bagId = getBagId(state);

    dispatch({
      meta: {
        ...data,
        bagItemId,
        bagId,
      },
      type: UPDATE_BAG_ITEM_REQUEST,
    });

    try {
      const result = await patchBagItem(bagId, bagItemId, data, query, config);
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));
      const normalizedBag = normalize(
        { ...result, items: newItems },
        { items: [bagItemSchema] },
      );

      dispatch({
        payload: normalizedBag,
        type: UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagItemId,
          bagId,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        meta: {
          ...data,
          bagItemId,
          bagId,
        },
        type: UPDATE_BAG_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default updateBagItemFactory;
