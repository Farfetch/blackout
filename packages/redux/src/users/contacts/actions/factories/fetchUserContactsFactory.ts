import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserContacts,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import contactsSchema from '../../../../entities/schemas/contact.js';
import type { Dispatch } from 'redux';

/**
 * Fetch all the contacts from user.
 *
 * @param getContacts - Get contacts client.
 *
 * @returns Thunk factory.
 */
const fetchUserContactsFactory =
  (getContacts: GetUserContacts) =>
  (id: number, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_CONTACTS_REQUEST,
      });

      const result = await getContacts(id, config);

      dispatch({
        payload: normalize(result, [contactsSchema]),
        type: actionTypes.FETCH_USER_CONTACTS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_CONTACTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserContactsFactory;
