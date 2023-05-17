import * as actionTypes from '../../actionTypes.js';
import {
  type Bag,
  type Config,
  type PostBagItem,
  type PostBagItemData,
  type PostBagItemQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem.js';
import type { BagItemActionMetadata } from '../../types/index.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to add a bag item.
 *
 * @param postBagItem - Post bag item client.
 *
 * @returns Thunk factory.
 */
const addBagItemFactory =
  (postBagItem: PostBagItem) =>
  (
    bagId: Bag['id'],
    data: PostBagItemData,
    query?: PostBagItemQuery,
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
        type: actionTypes.ADD_BAG_ITEM_REQUEST,
        meta: {
          ...metadata,
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

      await dispatch({
        payload: normalizedBag,
        type: actionTypes.ADD_BAG_ITEM_SUCCESS,
        meta: {
          ...metadata,
          ...data,
          bagId,
        },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.ADD_BAG_ITEM_FAILURE,
        meta: {
          ...metadata,
          ...data,
          bagId,
        },
      });

      throw errorAsBlackoutError;
    }
  };

export default addBagItemFactory;
