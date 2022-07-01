import * as actionTypes from '../../actionTypes';
import {
  Config,
  PutUserDefaultContactAddress,
  toBlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetUserDefaultContactAddressAction } from '../../types';

/**
 * @param userId    - Identifier of the user.
 * @param addressId - Identifier of the address.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default contact address.
 *
 * @param putUserDefaultContactAddress - Put default contact address client.
 *
 * @returns Thunk factory.
 */
export const setUserDefaultContactAddressFactory =
  (putUserDefaultContactAddress: PutUserDefaultContactAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (
    dispatch: Dispatch<SetUserDefaultContactAddressAction>,
  ): Promise<void> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      });

      const result = await putUserDefaultContactAddress(
        userId,
        addressId,
        config,
      );

      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
