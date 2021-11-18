import {
  DELETE_DEFAULT_CONTACT_ADDRESS_FAILURE,
  DELETE_DEFAULT_CONTACT_ADDRESS_REQUEST,
  DELETE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../actionTypes';

/**
 * @callback DeleteDefaultContactAddressThunkFactory
 * @param {string} userId - Identifier of the user.
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
 * @memberof module:addresses/actions
 *
 * @param {Function} deleteDefaultContactAddress - Delete default contact address client.
 *
 * @returns {DeleteDefaultContactAddressThunkFactory} Thunk factory.
 */
export default deleteDefaultContactAddress =>
  (userId, addressId, config) =>
  async dispatch => {
    dispatch({
      meta: { userId, addressId },
      type: DELETE_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      await deleteDefaultContactAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: DELETE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { userId, addressId },
        payload: { error },
        type: DELETE_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
