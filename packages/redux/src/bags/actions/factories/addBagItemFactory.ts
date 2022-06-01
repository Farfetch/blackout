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
 * @param data   - Details of the product to add to the bag.
 * @param query  - Query with parameters to get the bag.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to add a bag item.
 *
 * @param postBagItem - Post bag item client.
 *
 * @returns Thunk factory.
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
