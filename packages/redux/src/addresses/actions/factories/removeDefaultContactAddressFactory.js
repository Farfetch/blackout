import {
  REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
  REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
  REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../../actionTypes';

/**
 * @callback RemoveDefaultContactAddressThunkFactory
 * @param {number} userId - Identifier of the user.
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for deleting the users default contact address.
 *
 * @function doDeleteDefaultContactAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} deleteDefaultContactAddress - Delete default contact address client.
 *
 * @returns {RemoveDefaultContactAddressThunkFactory} Thunk factory.
 */
export default deleteDefaultContactAddress =>
  (userId, addressId, config) =>
  async dispatch => {
    dispatch({
      meta: { userId, addressId },
      type: REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      const result = await deleteDefaultContactAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { userId, addressId },
        payload: { error },
        type: REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
