import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type DeleteUserDefaultContactAddress,
  toBlackoutError,
  type User,
  type UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveUserDefaultContactAddressAction } from '../../types';

/**
 * Responsible for deleting the users default contact address.
 *
 * @param deleteUserDefaultContactAddress - Delete default contact address client.
 *
 * @returns Thunk factory.
 */
const removeUserDefaultContactAddressFactory =
  (deleteUserDefaultContactAddress: DeleteUserDefaultContactAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveUserDefaultContactAddressAction>,
  ): Promise<void> => {
    try {
      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      });

      const result = await deleteUserDefaultContactAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { userId, addressId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeUserDefaultContactAddressFactory;
