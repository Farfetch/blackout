import { getUser } from '../../../entities/redux/selectors';
import {
  SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
  SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
  SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
} from '../actionTypes';

/**
 * @callback SetDefaultShippingAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 *
 * @function doSetDefaultShippingAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} putDefaultShippingAddress - Put default shipping
 * address client.
 *
 * @returns {SetDefaultShippingAddressThunkFactory} Thunk factory.
 */
export default putDefaultShippingAddress =>
  (addressId, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const userId = getUser(state).id;

    dispatch({
      meta: { addressId },
      type: SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
    });

    try {
      await putDefaultShippingAddress({ userId, id: addressId }, config);

      dispatch({
        meta: { addressId },
        type: SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
