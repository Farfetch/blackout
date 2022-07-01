import * as actionTypes from '../../actionTypes';
import {
  Config,
  PutUserDefaultShippingAddress,
  toBlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetUserDefaultShippingAddressAction } from '../../types';

/**
 * @param addressId - Identifier of the address.
 * @param userId    - Identifier of the user.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 *
 * @param putDefaultShippingAddress - Put default shipping address client.
 *
 * @returns Thunk factory.
 */
export const setUserDefaultShippingAddressFactory =
  (putDefaultShippingAddress: PutUserDefaultShippingAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (
    dispatch: Dispatch<SetUserDefaultShippingAddressAction>,
  ): Promise<void> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      });

      const result = await putDefaultShippingAddress(
        { userId, id: addressId },
        config,
      );

      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
