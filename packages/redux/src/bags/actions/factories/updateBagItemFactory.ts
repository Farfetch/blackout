import * as actionTypes from '../../actionTypes.js';
import {
  type Bag,
  type BagItem,
  type Config,
  type PatchBagItem,
  type PatchBagItemData,
  type PatchBagItemQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem.js';
import type { BagItemActionMetadata } from '../../types/index.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

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
    bagId: Bag['id'],
    bagItemId: BagItem['id'],
    data: PatchBagItemData,
    query?: PatchBagItemQuery,
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

      await dispatch({
        payload: normalizedBag,
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...metadata,
          ...data,
          bagItemId,
          bagId,
        },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        meta: {
          ...metadata,
          ...data,
          bagItemId,
          bagId,
        },
        type: actionTypes.UPDATE_BAG_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateBagItemFactory;
