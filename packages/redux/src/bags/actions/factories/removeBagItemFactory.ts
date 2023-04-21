import * as actionTypes from '../../actionTypes.js';
import {
  type Bag,
  type BagItem,
  type Config,
  type DeleteBagItem,
  type DeleteBagItemQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem.js';
import type { BagItemActionMetadata } from '../../types/index.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

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
    bagId: Bag['id'],
    bagItemId: BagItem['id'],
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
    try {
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

      await dispatch({
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        meta: { ...metadata, bagId, bagItemId },
        type: actionTypes.REMOVE_BAG_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeBagItemFactory;
