import * as actionTypes from '../../actionTypes';
import { getBagId } from '../../selectors';
import { normalize } from 'normalizr';
import { toBlackoutError } from '@farfetch/blackout-client';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type {
  Bag,
  PostBagItem,
  PostBagItemData,
  Query,
} from '@farfetch/blackout-client/bags/types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, Nullable, StoreState } from '../../../types';

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
    let bagId: Nullable<string> = null;
    try {
      const state = getState();
      bagId = getBagId(state);

      // Do not add product if there's no bag set yet
      if (!bagId) {
        throw new Error('No bag id is set');
      }

      dispatch({
        type: actionTypes.ADD_BAG_ITEM_REQUEST,
        meta: {
          ...data,
          bagId,
        },
      });
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
        type: actionTypes.ADD_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagId,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.ADD_BAG_ITEM_FAILURE,
        meta: {
          ...data,
          bagId,
        },
      });

      throw error;
    }
  };

export default addBagItemFactory;
