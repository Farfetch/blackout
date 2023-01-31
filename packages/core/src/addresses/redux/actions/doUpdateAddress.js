import { getUser } from '../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import {
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
} from '../actionTypes';
import addressesSchema from '../../../entities/schemas/addresses';

/**
 * @callback UpdateAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {object} data - Object containing the address information.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates the address information with the specified 'addressId'.
 *
 * @function doUpdateAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} putAddress - Put address client.
 *
 * @returns {UpdateAddressThunkFactory} Thunk factory.
 */
export default putAddress =>
  (addressId, data, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const userId = getUser(state).id;

    dispatch({
      meta: { addressId },
      type: UPDATE_ADDRESS_REQUEST,
    });

    try {
      const result = await putAddress({ userId, id: addressId }, data, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: UPDATE_ADDRESS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: UPDATE_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
