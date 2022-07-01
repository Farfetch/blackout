import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteUserAddress,
  toBlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveUserAddressAction } from '../../types';

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
export const removeUserAddressFactory =
  (deleteAddress: DeleteUserAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (dispatch: Dispatch<RemoveUserAddressAction>): Promise<void> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.REMOVE_USER_ADDRESS_REQUEST,
      });

      const result = await deleteAddress({ userId, id: addressId }, config);

      dispatch({
        meta: { addressId },
        type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_USER_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
