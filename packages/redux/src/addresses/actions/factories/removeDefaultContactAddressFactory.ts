import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type {
  Address,
  DeleteDefaultContactAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { RemoveDefaultContactAddressAction } from '../../types';

/**
 * @param userId    - Identifier of the user.
 * @param addressId - Identifier of the address.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for deleting the users default contact address.
 *
 * @param deleteDefaultContactAddress - Delete default contact address client.
 *
 * @returns Thunk factory.
 */
const removeDefaultContactAddressFactory =
  (deleteDefaultContactAddress: DeleteDefaultContactAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveDefaultContactAddressAction>,
  ): Promise<void> => {
    try {
      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
      });

      const result = await deleteDefaultContactAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { userId, addressId },
        payload: { error: toError(error) },
        type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default removeDefaultContactAddressFactory;
