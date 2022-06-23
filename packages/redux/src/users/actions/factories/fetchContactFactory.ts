import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import contactsSchema from '../../../entities/schemas/contact';
import type { Dispatch } from 'redux';
import type { GetUserContact } from '@farfetch/blackout-client/users/contacts/types';

/**
 * Get contact from user.
 *
 * @param getContact - Get contact client.
 *
 * @returns Thunk factory.
 */
const fetchContactFactory =
  (getContact: GetUserContact) =>
  (id: number, contactId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_CONTACT_REQUEST,
      });

      const result = await getContact(id, contactId, config);

      dispatch({
        payload: normalize(result, contactsSchema),
        type: actionTypes.FETCH_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default fetchContactFactory;
