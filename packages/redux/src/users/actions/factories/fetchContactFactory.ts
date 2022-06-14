import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import contactsSchema from '../../../entities/schemas/contact';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetUserContact } from '@farfetch/blackout-client/users/contacts/types';
import type { GetUserContactQuery } from '@farfetch/blackout-client/users/types';

/**
 * @param id        - The user's id.
 * @param contactId - The contact id.
 * @param query     - Query parameters for get contacts.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Get contact from user.
 *
 * @param getContact - Get contact client.
 *
 * @returns Thunk factory.
 */
const fetchContactFactory =
  (getContact: GetUserContact) =>
  (
    id: number,
    contactId: string,
    query: GetUserContactQuery,
    config?: Config,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_CONTACT_REQUEST,
      });

      const result = await getContact(id, contactId, query, config);

      dispatch({
        payload: normalize(result, contactsSchema),
        type: actionTypes.FETCH_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default fetchContactFactory;
