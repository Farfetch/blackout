import {
  FETCH_BAG_FAILURE,
  FETCH_BAG_REQUEST,
  FETCH_BAG_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import bagItemSchema from '../../../entities/schemas/bagItem';
import type { Bag, GetBag, Query } from '@farfetch/blackout-client/bags/types';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @typedef {object} FetchBagQuery
 *
 * @alias FetchBagQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * @callback FetchBagThunkFactory
 * @param {number} bagId - Bag id.
 * @param {FetchBagQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch
 * a bag.
 *
 * @memberof module:bags/actions/factories
 *
 * @param {Function} getBag - Get bag client.
 *
 * @returns {FetchBagThunkFactory} Thunk factory.
 */
const fetchBagFactory =
  (getBag: GetBag) =>
  (bagId: string, query?: Query, config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Bag> => {
    dispatch({
      type: FETCH_BAG_REQUEST,
    });

    try {
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
        type: FETCH_BAG_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_BAG_FAILURE,
      });

      throw error;
    }
  };

export default fetchBagFactory;
