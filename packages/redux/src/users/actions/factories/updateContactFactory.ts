import * as actionTypes from '../../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PatchUserContact,
  PatchUserContactData,
} from '@farfetch/blackout-client/users/contacts/types';

/**
 * Updates a user contact.
 *
 * @param patchContact - Patch contact client.
 *
 * @returns Thunk factory.
 */

const updateContactFactory =
  (patchContact: PatchUserContact) =>
  (
    id: number,
    contactId: string,
    data: PatchUserContactData,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CONTACT_REQUEST,
      });

      const result = await patchContact(id, contactId, data, config);

      dispatch({
        type: actionTypes.UPDATE_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default updateContactFactory;
