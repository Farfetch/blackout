import {
  GET_DEFAULT_CONTACT_ADDRESS_FAILURE,
  GET_DEFAULT_CONTACT_ADDRESS_REQUEST,
  GET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetDefaultContactAddressThunkFactory
 * @param {string} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for obtaining the default contact address of the user.
 *
 * @function doGetDefaultContactAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} getDefaultContactAddress - Get default contact
 * address client.
 *
 * @returns {GetDefaultContactAddressThunkFactory} Thunk factory.
 */
export default getDefaultContactAddress =>
  (userId, config) =>
  async dispatch => {
    dispatch({
      type: GET_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      const result = await getDefaultContactAddress(userId, config);

      dispatch({
        payload: result,
        type: GET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
