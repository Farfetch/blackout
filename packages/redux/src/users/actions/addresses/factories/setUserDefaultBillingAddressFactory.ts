import * as actionTypes from '../../../actionTypes';
import {
  Address,
  Config,
  PutUserDefaultBillingAddress,
  toBlackoutError,
  User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetUserDefaultBillingAddressAction } from '../../../types';

/**
 * @param addressId - Identifier of the address.
 * @param userId    - Identifier of the user.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default billing address.
 *
 * @param putUserDefaultBillingAddress - Put default billing address client.
 *
 * @returns Thunk factory.
 */
export const setUserDefaultBillingAddressFactory =
  (putUserDefaultBillingAddress: PutUserDefaultBillingAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (
    dispatch: Dispatch<SetUserDefaultBillingAddressAction>,
  ): Promise<void> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
      });

      const result = await putUserDefaultBillingAddress(
        { id: addressId, userId },
        config,
      );

      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
