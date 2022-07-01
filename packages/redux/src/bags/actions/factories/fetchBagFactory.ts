import * as actionTypes from '../../actionTypes';
import {
  Bag,
  Config,
  GetBag,
  GetBagQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @param bagId  - Bag id.
 * @param query  - Query with parameters to get the bag.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch a bag.
 *
 * @param getBag - Get bag client.
 *
 * @returns Thunk factory.
 */
const fetchBagFactory =
  (getBag: GetBag) =>
  (bagId: string, query?: GetBagQuery, config?: Config) =>
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

      dispatch({
        payload: normalizedBag,
        type: actionTypes.FETCH_BAG_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_BAG_FAILURE,
      });

      throw error;
    }
  };

export default fetchBagFactory;
