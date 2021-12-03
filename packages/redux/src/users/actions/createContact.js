import {
  CREATE_CONTACT_FAILURE,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import contactsSchema from '../../entities/schemas/contact';

/**
 * @callback CreateContactThunkFactory
 * @param {object} id - User's id to get the contacts from.
 * @param {object} [data] - Object containing the new contact.
 * @param {object} [query] - Query parameters for creating a new user contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a user contact.
 *
 * @function createContact
 * @memberof module:users/actions
 *
 * @param {Function} postContact - Post contact client.
 *
 * @returns {CreateContactThunkFactory} Thunk factory.
 */
export default postContact => (id, data, query, config) => async dispatch => {
  dispatch({
    type: CREATE_CONTACT_REQUEST,
  });

  try {
    const result = await postContact(id, data, query, config);

    dispatch({
      type: CREATE_CONTACT_SUCCESS,
      payload: normalize(result, contactsSchema),
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: CREATE_CONTACT_FAILURE,
    });

    throw error;
  }
};
