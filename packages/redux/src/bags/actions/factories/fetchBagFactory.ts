import * as actionTypes from '../../actionTypes.js';
import {
  type Bag,
  type Config,
  type GetBag,
  type GetBagQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch a bag.
 *
 * @param getBag - Get bag client.
 *
 * @returns Thunk factory.
 */
const fetchBagFactory =
  (getBag: GetBag) =>
  (bagId: Bag['id'], query?: GetBagQuery, config?: Config) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Bag> => {
    try {
      dispatch({
        type: actionTypes.FETCH_BAG_REQUEST,
      });

      const result = await getBag(bagId, query, config);
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
        type: actionTypes.FETCH_BAG_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_BAG_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchBagFactory;
