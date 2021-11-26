import {
  ADD_BAG_ITEM_FAILURE,
  ADD_BAG_ITEM_REQUEST,
  ADD_BAG_ITEM_SUCCESS,
} from '../../actionTypes';
import { getBagId } from '../../selectors';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type {
  Bag,
  PostBagItem,
  PostBagItemData,
  Query,
} from '@farfetch/blackout-client/bags/types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @typedef {object} AddBagItemQuery
 *
 * @alias AddBagItemQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * @callback AddBagItemThunkFactory
 *
 * @param {object} data - Details of the product to add to the bag.
 * @param {number} data.productId - Product identifier.
 * @param {number} [data.productAggregatorId] - Product aggregator identifier.
 * @param {number} [data.merchantId] - Merchant identifier.
 * @param {number} [data.quantity=1] - Bag item quantity.
 * @param {number} data.size - Bag item size.
 * @param {number} data.scale - Bag item scale.
 * @param {string} [data.customAttributes] - For customizable products, string describing the
 * product customization, typically in JSON format. For example, users may be able to customize
 * the materials and colors of parts of the product.
 * @param {string} [data.authCode] - For restriction product. This value is a code, received by
 * the user, used to unlock the AddToBag operation.
 * @param {AddBagItemQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to add
 * a bag item.
 *
 * @memberof module:bags/actions/factories
 *
 * @param {Function} postBagItem - Post bag item client.
 *
 * @returns {AddBagItemThunkFactory} Thunk factory.
 */
const addBagItemFactory =
  (postBagItem: PostBagItem) =>
  (data: PostBagItemData, query?: Query, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Bag> => {
    const state = getState();
    const bagId = getBagId(state);

    // Do not add product if there's no bag set yet
    if (!bagId) {
      throw new Error('No bag id is set');
    }

    dispatch({
      type: ADD_BAG_ITEM_REQUEST,
      meta: {
        ...data,
        bagId,
      },
    });

    try {
      const result = await postBagItem(bagId, data, query, config);
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
        type: ADD_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagId,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: ADD_BAG_ITEM_FAILURE,
        meta: {
          ...data,
          bagId,
        },
      });

      throw error;
    }
  };

export default addBagItemFactory;
