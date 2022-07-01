import * as actionTypes from '../../actionTypes';
import {
  Bag,
  Config,
  PatchBagItem,
  PatchBagItemData,
  PatchBagItemQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { getBagId } from '../../selectors';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, Nullable, StoreState } from '../../../types';

/**
 * @param bagItemId - Bag item id.
 * @param data      - Details of the product to update a bag item.
 * @param query     - Query with parameters to get the bag.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to update a bag
 * item with given data.
 *
 * @param patchBagItem - Patch bag item client.
 *
 * @returns Thunk factory.
 */
const updateBagItemFactory =
  (patchBagItem: PatchBagItem) =>
  (
    bagItemId: number,
    data: PatchBagItemData,
    query?: PatchBagItemQuery,
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
          ...data,
          bagItemId,
          bagId,
        },
        type: actionTypes.UPDATE_BAG_ITEM_REQUEST,
      });
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
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagItemId,
          bagId,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        meta: {
          ...data,
          bagItemId,
          bagId,
        },
        type: actionTypes.UPDATE_BAG_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default updateBagItemFactory;
