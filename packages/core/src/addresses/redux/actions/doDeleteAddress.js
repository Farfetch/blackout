import {
  DELETE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
} from '../actionTypes';
import { getUser } from '../../../entities/redux/selectors';

/**
 * @callback DeleteAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for removing the address with the specified 'addressId'.
 *
 * @function doDeleteAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} deleteAddress - Delete address client.
 *
 * @returns {DeleteAddressThunkFactory} Thunk factory.
 */
export default deleteAddress =>
  (addressId, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const userId = getUser(state).id;

    dispatch({
      meta: { addressId },
      type: DELETE_ADDRESS_REQUEST,
    });

    try {
      await deleteAddress({ userId, id: addressId }, config);

      dispatch({
        meta: { addressId },
        type: DELETE_ADDRESS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: DELETE_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
