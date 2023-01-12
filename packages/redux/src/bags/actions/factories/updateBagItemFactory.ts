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
import type { BagItemActionMetadata } from '../../types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, Nullable, StoreState } from '../../../types';

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
