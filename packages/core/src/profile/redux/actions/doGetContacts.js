import {
  GET_CONTACTS_FAILURE,
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import contactsSchema from '../../../entities/schemas/contact';

/**
 * @callback GetContactsThunkFactory
 * @param {object} id - The user's id.
 * @param {object} [query] - Query parameters for get contacts.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get all the contacts from user.
 *
 * @function doGetContacts
 * @memberof module:profile/actions
 *
 * @param {Function} getContacts - Get contacts client.
 *
 * @returns {GetContactsThunkFactory} Thunk factory.
 */
export default getContacts => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_CONTACTS_REQUEST,
  });

  try {
    const result = await getContacts(id, query, config);

    dispatch({
      payload: normalize(result, [contactsSchema]),
      type: GET_CONTACTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_CONTACTS_FAILURE,
    });

    throw error;
  }
};
