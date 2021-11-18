import {
  GET_ADDRESS_FAILURE,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
} from '../actionTypes';
import { getUser } from '../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';

/**
 * @callback GetAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the details of the address with the specified 'addressId'.
 *
 * @function doGetAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} getAddress - Get address client.
 *
 * @returns {GetAddressThunkFactory} Thunk factory.
 */
export default getAddress =>
  (addressId, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const userId = getUser(state).id;

    dispatch({
      meta: { addressId },
      type: GET_ADDRESS_REQUEST,
    });

    try {
      const result = await getAddress({ id: addressId, userId }, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: GET_ADDRESS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: GET_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
