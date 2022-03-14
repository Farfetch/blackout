import {
  FETCH_CONTACT_FAILURE,
  FETCH_CONTACT_REQUEST,
  FETCH_CONTACT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import contactsSchema from '../../../entities/schemas/contact';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetContact,
  GetContactQuery,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback FetchContactThunkFactory
 * @param {string} id - The user's id.
 * @param {string} contactId - The contact id.
 * @param {object} [query] - Query parameters for get contacts.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get contact from user.
 *
 * @function fetchContact
 * @memberof module:users/actions
 *
 * @param {Function} getContact - Get contact client.
 *
 * @returns {FetchContactThunkFactory} Thunk factory.
 */
const fetchContactFactory =
  (getContact: GetContact) =>
  (id: number, contactId: string, query: GetContactQuery, config?: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_CONTACT_REQUEST,
    });

    try {
      const result = await getContact(id, contactId, query, config);

      dispatch({
        payload: normalize(result, contactsSchema),
        type: FETCH_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default fetchContactFactory;
