import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  PatchUserContact,
  PatchUserContactData,
} from '@farfetch/blackout-client/users/contacts/types';
import type { PatchUserContactQuery } from '@farfetch/blackout-client/users/types';

/**
 * @param id        - The user's id.
 * @param contactId - The contact id.
 * @param data      - Array of objects containing the item patch document reflecting the changes to be
 *                    made to the contact.
 * @param query     - Query parameters for the update contact.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
    query: PatchUserContactQuery,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CONTACT_REQUEST,
      });

      const result = await patchContact(id, contactId, data, query, config);

      dispatch({
        type: actionTypes.UPDATE_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.UPDATE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default updateContactFactory;
