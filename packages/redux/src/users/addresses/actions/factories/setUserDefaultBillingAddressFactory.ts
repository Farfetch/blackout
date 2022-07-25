import * as actionTypes from '../../actionTypes';
import {
  Config,
  PutUserDefaultBillingAddress,
  toBlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetUserDefaultBillingAddressAction } from '../../types';

/**
 * Sets the address specified with 'addressId', as the default billing address.
 *
 * @param putUserDefaultBillingAddress - Put default billing address client.
 *
 * @returns Thunk factory.
 */
const setUserDefaultBillingAddressFactory =
  (putUserDefaultBillingAddress: PutUserDefaultBillingAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
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

export default setUserDefaultBillingAddressFactory;
