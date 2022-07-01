import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteUserContact,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Remove a user contact.
 *
 * @param deleteContact - Delete contact client.
 *
 * @returns Thunk factory.
 */
export const removeUserContactFactory =
  (deleteContact: DeleteUserContact) =>
  (id: number, contactId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.REMOVE_USER_CONTACT_REQUEST,
      });

      const result = await deleteContact(id, contactId, config);

      dispatch({
        type: actionTypes.REMOVE_USER_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_USER_CONTACT_FAILURE,
      });

      throw error;
    }
  };
