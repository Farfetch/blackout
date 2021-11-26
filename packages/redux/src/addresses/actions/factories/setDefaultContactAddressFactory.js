import {
  SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
  SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
  SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../../actionTypes';

/**
 * @callback SetDefaultContactAddressThunkFactory
 * @param {string} userId - Identifier of the user.
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default contact address.
 *
 * @function doSetDefaultContactAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} putDefaultContactAddress - Put default contact
 * address client.
 *
 * @returns {SetDefaultContactAddressThunkFactory} Thunk factory.
 */
export default putDefaultContactAddress =>
  (userId, addressId, config) =>
  async dispatch => {
    dispatch({
      meta: { addressId },
      type: SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      const result = await putDefaultContactAddress(userId, addressId, config);

      dispatch({
        meta: { addressId },
        type: SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
