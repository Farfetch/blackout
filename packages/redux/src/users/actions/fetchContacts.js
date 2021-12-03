import {
  FETCH_CONTACTS_FAILURE,
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import contactsSchema from '../../entities/schemas/contact';

/**
 * @callback FetchContactsThunkFactory
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
 * @function fetchContacts
 * @memberof module:users/actions
 *
 * @param {Function} getContacts - Get contacts client.
 *
 * @returns {FetchContactsThunkFactory} Thunk factory.
 */
export default getContacts => (id, query, config) => async dispatch => {
  dispatch({
    type: FETCH_CONTACTS_REQUEST,
  });

  try {
    const result = await getContacts(id, query, config);

    dispatch({
      payload: normalize(result, [contactsSchema]),
      type: FETCH_CONTACTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_CONTACTS_FAILURE,
    });

    throw error;
  }
};
