import {
  REMOVE_CONTACT_FAILURE,
  REMOVE_CONTACT_REQUEST,
  REMOVE_CONTACT_SUCCESS,
} from '../../actionTypes';

/**
 * @callback RemoveContactThunkFactory
 * @param {string} id - The user's id.
 * @param {string} contactId - The contact id.
 * @param {object} [query] - Query parameters for the delete contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Remove a user contact.
 *
 * @function removeContact
 * @memberof module:users/actions
 *
 * @param {Function} deleteContact - Delete contact client.
 *
 * @returns {RemoveContactThunkFactory} Thunk factory.
 */

const removeContactFactory =
  deleteContact => (id, contactId, query, config) => async dispatch => {
    dispatch({
      type: REMOVE_CONTACT_REQUEST,
    });

    try {
      await deleteContact(id, contactId, query, config);

      dispatch({
        type: REMOVE_CONTACT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: REMOVE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default removeContactFactory;
