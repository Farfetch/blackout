import {
  UPDATE_CONTACT_FAILURE,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
} from '../actionTypes';

/**
 * @callback UpdateContactThunkFactory
 * @param {object} id        - The user's id.
 * @param {object} contactId - The contact id.
 * @param {Array} data - Array of objects containing the item patch document
 *  reflecting the changes to be made to the contact.
 * @param {object} [query] - Query parameters for the update contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates a user contact.
 *
 * @function updateContact
 * @memberof module:users/actions
 *
 * @param {Function} patchContact - Patch contact client.
 *
 * @returns {UpdateContactThunkFactory} Thunk factory.
 */
export default patchContact =>
  (id, contactId, data, query, config) =>
  async dispatch => {
    dispatch({
      type: UPDATE_CONTACT_REQUEST,
    });

    try {
      await patchContact(id, contactId, data, query, config);

      dispatch({
        type: UPDATE_CONTACT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_CONTACT_FAILURE,
      });

      throw error;
    }
  };
