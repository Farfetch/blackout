import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import contactsSchema from '../../../entities/schemas/contact';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetUserContacts } from '@farfetch/blackout-client/users/contacts/types';
import type { GetUserContactsQuery } from '@farfetch/blackout-client/users/types';

/**
 * @param id     - The user's id.
 * @param query  - Query parameters for get contacts.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all the contacts from user.
 *
 * @param getContacts - Get contacts client.
 *
 * @returns Thunk factory.
 */
const fetchContactsFactory =
  (getContacts: GetUserContacts) =>
  (id: number, query: GetUserContactsQuery, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_CONTACTS_REQUEST,
      });

      const result = await getContacts(id, query, config);

      dispatch({
        payload: normalize(result, [contactsSchema]),
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_CONTACTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchContactsFactory;
