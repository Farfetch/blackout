import {
  CREATE_CONTACT_FAILURE,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import contactsSchema from '../../../entities/schemas/contact';
import type {
  Contact,
  PostContact,
  PostContactQuery,
} from '@farfetch/blackout-client/users/types';
import type { Dispatch } from 'redux';

/**
 * @callback CreateContactThunkFactory
 * @param {object} id - User's id to get the contacts from.
 * @param {object} [data] - Object containing the new contact.
 * @param {object} [query] - Query parameters for creating a new user contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a user contact.
 *
 * @function createContact
 * @memberof module:users/actions
 *
 * @param {Function} postContact - Post contact client.
 *
 * @returns {CreateContactThunkFactory} Thunk factory.
 */
const createContactFactory =
  (postContact: PostContact) =>
  (
    id: number,
    data: Contact,
    query: PostContactQuery,
    config: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_CONTACT_REQUEST,
    });

    try {
      const result = await postContact(id, data, query, config);

      dispatch({
        type: CREATE_CONTACT_SUCCESS,
        payload: normalize(result, contactsSchema),
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default createContactFactory;
