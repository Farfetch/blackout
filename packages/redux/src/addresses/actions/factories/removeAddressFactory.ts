import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type {
  Address,
  DeleteAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { RemoveAddressAction } from '../../types';

/**
 * @param addressId - Identifier of the address.
 * @param userId    - Identifier of the user.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for removing the address with the specified 'addressId'.
 *
 * @param deleteAddress - Delete address client.
 *
 * @returns Thunk factory.
 */
const removeAddressFactory =
  (deleteAddress: DeleteAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (dispatch: Dispatch<RemoveAddressAction>): Promise<void> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.REMOVE_ADDRESS_REQUEST,
      });

      const result = await deleteAddress({ userId, id: addressId }, config);

      dispatch({
        meta: { addressId },
        type: actionTypes.REMOVE_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error: toError(error) },
        type: actionTypes.REMOVE_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default removeAddressFactory;
