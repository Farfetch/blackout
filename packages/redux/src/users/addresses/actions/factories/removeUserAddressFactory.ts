import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type DeleteUserAddress,
  toBlackoutError,
  type User,
  type UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveUserAddressAction } from '../../types';

/**
 * Responsible for removing the address with the specified 'addressId'.
 *
 * @param deleteUserAddress - Delete user address client.
 *
 * @returns Thunk factory.
 */
const removeUserAddressFactory =
  (deleteUserAddress: DeleteUserAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (dispatch: Dispatch<RemoveUserAddressAction>): Promise<void> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.REMOVE_USER_ADDRESS_REQUEST,
      });

      const result = await deleteUserAddress({ userId, id: addressId }, config);

      dispatch({
        meta: { addressId },
        type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { addressId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_USER_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeUserAddressFactory;
