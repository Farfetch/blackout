import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toBlackoutError } from '@farfetch/blackout-client';
import contactsSchema from '../../../entities/schemas/contact';
import type { Dispatch } from 'redux';
import type {
  PostUserContact,
  UserContact,
} from '@farfetch/blackout-client/users/contacts/types';

/**
 * Creates a user contact.
 *
 * @param postContact - Post contact client.
 *
 * @returns Thunk factory.
 */
const createContactFactory =
  (postContact: PostUserContact) =>
  (id: number, data: UserContact, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_CONTACT_REQUEST,
      });

      const result = await postContact(id, data, config);

      dispatch({
        type: actionTypes.CREATE_CONTACT_SUCCESS,
        payload: normalize(result, contactsSchema),
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default createContactFactory;
