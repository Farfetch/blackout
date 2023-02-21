import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetUserContact,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import contactsSchema from '../../../../entities/schemas/contact';
import type { Dispatch } from 'redux';

/**
 * Get contact from user.
 *
 * @param getContact - Get contact client.
 *
 * @returns Thunk factory.
 */
const fetchUserContactFactory =
  (getContact: GetUserContact) =>
  (id: number, contactId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_CONTACT_REQUEST,
      });

      const result = await getContact(id, contactId, config);

      dispatch({
        payload: normalize(result, contactsSchema),
        type: actionTypes.FETCH_USER_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_CONTACT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserContactFactory;
