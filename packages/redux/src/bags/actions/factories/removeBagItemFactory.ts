import { getBagId } from '../../selectors';
import { normalize } from 'normalizr';
import {
  REMOVE_BAG_ITEM_FAILURE,
  REMOVE_BAG_ITEM_REQUEST,
  REMOVE_BAG_ITEM_SUCCESS,
} from '../../actionTypes';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type {
  Bag,
  DeleteBagItem,
  PatchBagItemData,
  Query,
} from '@farfetch/blackout-client/bags/types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @typedef {object} RemoveBagItemQuery
 *
 * @alias RemoveBagItemQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * @callback RemoveBagItemThunkFactory
 * @param {number} bagItemId - Bag item id.
 * @param {RemoveBagItemQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to remove
 * a bag item.
 *
 * @memberof module:bags/actions/factories
 *
 * @param {Function} deleteBagItem - Delete bag item client.
 *
 * @returns {RemoveBagItemThunkFactory} Thunk factory.
 */
const removeBagItemFactory =
  (deleteBagItem: DeleteBagItem) =>
  (
    bagItemId: number,
    data?: PatchBagItemData,
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
        bagId,
        bagItemId,
      },
      type: REMOVE_BAG_ITEM_REQUEST,
    });

    try {
      const result = await deleteBagItem(bagId, bagItemId, query, config);
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
        type: REMOVE_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagId,
          bagItemId,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        meta: { bagId, bagItemId },
        type: REMOVE_BAG_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default removeBagItemFactory;
