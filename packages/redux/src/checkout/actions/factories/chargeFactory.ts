import {
  CHARGE_FAILURE,
  CHARGE_REQUEST,
  CHARGE_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetChargesResponse,
  PostCharges,
  PostChargesData,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @typedef {object} ChargeData
 * @property {object} chargeTransaction - Charge transaction data.
 */

/**
 * @callback ChargeThunkFactory
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {ChargeData} data - Details for the charge.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an intent charge. To be used by pay-by-link 1.5 only.
 *
 * @function chargeFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} postCharges - Post charges client.
 *
 * @returns {ChargeThunkFactory} Thunk factory.
 */
const chargeFactory =
  (postCharges: PostCharges) =>
  (id: string, data: PostChargesData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetChargesResponse> => {
    dispatch({
      type: CHARGE_REQUEST,
    });

    try {
      const result = await postCharges(id, data, config);

      dispatch({
        payload: result,
        type: CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CHARGE_FAILURE,
      });

      throw error;
    }
  };

export default chargeFactory;
