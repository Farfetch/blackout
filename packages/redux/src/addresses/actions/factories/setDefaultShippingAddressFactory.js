import {
  SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
  SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
  SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
} from '../../actionTypes';

/**
 * @callback SetDefaultShippingAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {number} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 *
 * @function doSetDefaultShippingAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} putDefaultShippingAddress - Put default shipping
 * address client.
 *
 * @returns {SetDefaultShippingAddressThunkFactory} Thunk factory.
 */
export default putDefaultShippingAddress =>
  (userId, addressId, config) =>
  async dispatch => {
    dispatch({
      meta: { addressId },
      type: SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
    });

    try {
      const result = await putDefaultShippingAddress(
        { userId, id: addressId },
        config,
      );

      dispatch({
        meta: { addressId },
        type: SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
