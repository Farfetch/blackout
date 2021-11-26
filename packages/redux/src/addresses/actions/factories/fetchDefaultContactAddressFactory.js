import {
  FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
  FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
  FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../../actionTypes';

/**
 * @callback FetchDefaultContactAddressThunkFactory
 * @param {number} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for obtaining the default contact address of the user.
 *
 * @function doGetDefaultContactAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} getDefaultContactAddress - Get default contact
 * address client.
 *
 * @returns {FetchDefaultContactAddressThunkFactory} Thunk factory.
 */
export default getDefaultContactAddress =>
  (userId, config) =>
  async dispatch => {
    dispatch({
      type: FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      const result = await getDefaultContactAddress(userId, config);

      dispatch({
        payload: result,
        type: FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
