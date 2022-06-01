import {
  UPDATE_CONTACT_FAILURE,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PatchContact,
  PatchContactData,
  PatchContactQuery,
} from '@farfetch/blackout-client/users/types';

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
  (patchContact: PatchContact) =>
  (
    id: number,
    contactId: string,
    data: PatchContactData,
    query: PatchContactQuery,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_CONTACT_REQUEST,
    });

    try {
      const result = await patchContact(id, contactId, data, query, config);

      dispatch({
        type: UPDATE_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default updateContactFactory;
