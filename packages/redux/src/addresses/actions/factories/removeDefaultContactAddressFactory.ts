import {
  REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
  REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
  REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../../actionTypes';
import type {
  Address,
  DeleteDefaultContactAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { RemoveDefaultContactAddressAction } from '../../types';

/**
 * @callback RemoveDefaultContactAddressThunkFactory
 * @param {number} userId - Identifier of the user.
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for deleting the users default contact address.
 *
 * @function doDeleteDefaultContactAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} deleteDefaultContactAddress - Delete default contact address client.
 *
 * @returns {RemoveDefaultContactAddressThunkFactory} Thunk factory.
 */
const removeDefaultContactAddressFactory =
  (deleteDefaultContactAddress: DeleteDefaultContactAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveDefaultContactAddressAction>,
  ): Promise<void> => {
    dispatch({
      meta: { userId, addressId },
      type: REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      const result = await deleteDefaultContactAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { userId, addressId },
        payload: { error },
        type: REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default removeDefaultContactAddressFactory;
