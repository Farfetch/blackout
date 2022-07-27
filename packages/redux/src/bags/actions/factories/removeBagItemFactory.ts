import * as actionTypes from '../../actionTypes';
import {
  Bag,
  Config,
  DeleteBagItem,
  DeleteBagItemQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { getBagId } from '../../selectors';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type { BagItemActionMetadata } from '../../types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, Nullable, StoreState } from '../../../types';

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
    query?: DeleteBagItemQuery,
    metadata?: BagItemActionMetadata,
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
          ...metadata,
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
          ...metadata,
          bagId,
          bagItemId,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        meta: { ...metadata, bagId, bagItemId },
        type: actionTypes.REMOVE_BAG_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default removeBagItemFactory;
