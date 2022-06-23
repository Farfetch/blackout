import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import contactsSchema from '../../../entities/schemas/contact';
import type { Dispatch } from 'redux';
import type { GetUserContacts } from '@farfetch/blackout-client/users/contacts/types';

/**
 * Fetch all the contacts from user.
 *
 * @param getContacts - Get contacts client.
 *
 * @returns Thunk factory.
 */
const fetchContactsFactory =
  (getContacts: GetUserContacts) =>
  (id: number, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_CONTACTS_REQUEST,
      });

      const result = await getContacts(id, config);

      dispatch({
        payload: normalize(result, [contactsSchema]),
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CONTACTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchContactsFactory;
