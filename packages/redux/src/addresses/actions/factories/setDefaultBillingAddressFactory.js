import {
  SET_DEFAULT_BILLING_ADDRESS_FAILURE,
  SET_DEFAULT_BILLING_ADDRESS_REQUEST,
  SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
} from '../../actionTypes';

/**
 * @callback SetDefaultBillingAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {number} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default billing address.
 *
 * @function doSetDefaultBillingAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} putDefaultBillingAddress - Put default billing
 * address client.
 *
 * @returns {SetDefaultBillingAddressThunkFactory} Thunk factory.
 */
export default putDefaultBillingAddress =>
  (userId, addressId, config) =>
  async dispatch => {
    dispatch({
      meta: { addressId },
      type: SET_DEFAULT_BILLING_ADDRESS_REQUEST,
    });

    try {
      const result = await putDefaultBillingAddress(
        { id: addressId, userId },
        config,
      );

      dispatch({
        meta: { addressId },
        type: SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: SET_DEFAULT_BILLING_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
