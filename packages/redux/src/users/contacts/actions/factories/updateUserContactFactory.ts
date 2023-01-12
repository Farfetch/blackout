import * as actionTypes from '../../actionTypes';
import {
  Config,
  PatchUserContact,
  PatchUserContactOperation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Updates a user contact.
 *
 * @param patchContact - Patch contact client.
 *
 * @returns Thunk factory.
 */

const updateUserContactFactory =
  (patchContact: PatchUserContact) =>
  (
    id: number,
    contactId: string,
    data: PatchUserContactOperation[],
    config?: Config,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_USER_CONTACT_REQUEST,
      });

      const result = await patchContact(id, contactId, data, config);

      dispatch({
        type: actionTypes.UPDATE_USER_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_USER_CONTACT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateUserContactFactory;
