import { normalize } from 'normalizr';
import {
  SET_PROMOCODE_FAILURE,
  SET_PROMOCODE_REQUEST,
  SET_PROMOCODE_SUCCESS,
} from '../../actionTypes';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PutPromocode,
  PutPromocodeData,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @typedef {object} SetPromocodeData
 *
 * @alias SetPromocodeData
 *
 * @property {string} promocode - Promocode.
 */

/**
 * @callback SetPromocodeThunkFactory
 * @param {number} id - Universal identifier of the Checkout.
 * @param {SetPromocodeData} data - Data to add a promocode.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding promo code information.
 *
 * @function setPromocodeFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} putPromocode - Put promocode client.
 *
 * @returns {SetPromocodeThunkFactory} Thunk factory.
 */
const setPromocodeFactory =
  (putPromocode: PutPromocode) =>
  (id: number, data: PutPromocodeData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    dispatch({
      type: SET_PROMOCODE_REQUEST,
    });

    try {
      const result = await putPromocode(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: SET_PROMOCODE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: SET_PROMOCODE_FAILURE,
      });

      throw error;
    }
  };

export default setPromocodeFactory;
