import * as actionTypes from '../../actionTypes';
import {
  Bag,
  Config,
  DeleteBagItem,
  DeleteBagItemQuery,
  PatchBagItemData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { getBagId } from '../../selectors';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, Nullable, StoreState } from '../../../types';

/**
 * @param bagItemId - Bag item id.
 * @param query     - Query with parameters to get the bag.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to remove a bag
 * item.
 *
 * @param deleteBagItem - Delete bag item client.
 *
 * @returns Thunk factory.
 */
const removeBagItemFactory =
  (deleteBagItem: DeleteBagItem) =>
  (
    bagItemId: number,
    data?: PatchBagItemData,
    query?: DeleteBagItemQuery,
    config?: Config,
  ) =>
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

      dispatch({
        meta: {
          bagId,
          bagItemId,
        },
        type: actionTypes.REMOVE_BAG_ITEM_REQUEST,
      });
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
        type: actionTypes.REMOVE_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagId,
          bagItemId,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        meta: { bagId, bagItemId },
        type: actionTypes.REMOVE_BAG_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default removeBagItemFactory;
