import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import contactsSchema from '../../../entities/schemas/contact';
import type { Dispatch } from 'redux';
import type {
  PostUserContact,
  UserContact,
} from '@farfetch/blackout-client/users/contacts/types';
import type { PostUserContactQuery } from '@farfetch/blackout-client/users/types';

/**
 * @param id     - User's id to get the contacts from.
 * @param data   - Object containing the new contact.
 * @param query  - Query parameters for creating a new user contact.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a user contact.
 *
 * @param postContact - Post contact client.
 *
 * @returns Thunk factory.
 */
const createContactFactory =
  (postContact: PostUserContact) =>
  (
    id: number,
    data: UserContact,
    query: PostUserContactQuery,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_CONTACT_REQUEST,
      });

      const result = await postContact(id, data, query, config);

      dispatch({
        type: actionTypes.CREATE_CONTACT_SUCCESS,
        payload: normalize(result, contactsSchema),
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CREATE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default createContactFactory;
