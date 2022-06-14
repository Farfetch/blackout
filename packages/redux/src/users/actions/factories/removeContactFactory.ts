import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { DeleteUserContact } from '@farfetch/blackout-client/users/contacts/types';
import type { DeleteUserContactQuery } from '@farfetch/blackout-client/users/types';
import type { Dispatch } from 'redux';
/**
 * @param id        - The user's id.
 * @param contactId - The contact id.
 * @param query     - Query parameters for the delete contact.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Remove a user contact.
 *
 * @param deleteContact - Delete contact client.
 *
 * @returns Thunk factory.
 */

const removeContactFactory =
  (deleteContact: DeleteUserContact) =>
  (
    id: number,
    contactId: string,
    query: DeleteUserContactQuery,
    config?: Config,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.REMOVE_CONTACT_REQUEST,
      });

      const result = await deleteContact(id, contactId, query, config);

      dispatch({
        type: actionTypes.REMOVE_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.REMOVE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default removeContactFactory;
