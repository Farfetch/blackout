import {
  DELETE_CONTACT_FAILURE,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
} from '../actionTypes';

/**
 * @callback DeleteContactThunkFactory
 * @param {string} id - The user's id.
 * @param {string} contactId - The contact id.
 * @param {object} [query] - Query parameters for the delete contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Delete a user contact.
 *
 * @function doDeleteContact
 * @memberof module:profile/actions
 *
 * @param {Function} deleteContact - Delete contact client.
 *
 * @returns {DeleteContactThunkFactory} Thunk factory.
 */
export default deleteContact =>
  (id, contactId, query, config) =>
  async dispatch => {
    dispatch({
      type: DELETE_CONTACT_REQUEST,
    });

    try {
      await deleteContact(id, contactId, query, config);

      dispatch({
        type: DELETE_CONTACT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: DELETE_CONTACT_FAILURE,
      });

      throw error;
    }
  };
