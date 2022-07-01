import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUserContact,
  toBlackoutError,
  UserContact,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import contactsSchema from '../../../../entities/schemas/contact';
import type { Dispatch } from 'redux';

/**
 * Creates a user contact.
 *
 * @param postContact - Post contact client.
 *
 * @returns Thunk factory.
 */
export const createUserContactFactory =
  (postContact: PostUserContact) =>
  (id: number, data: UserContact, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_CONTACT_REQUEST,
      });

      const result = await postContact(id, data, config);

      dispatch({
        type: actionTypes.CREATE_USER_CONTACT_SUCCESS,
        payload: normalize(result, contactsSchema),
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_CONTACT_FAILURE,
      });

      throw error;
    }
  };
