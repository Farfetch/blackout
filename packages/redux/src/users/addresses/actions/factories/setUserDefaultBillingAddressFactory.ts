import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PutUserDefaultBillingAddress,
  toBlackoutError,
  type User,
  type UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetUserDefaultBillingAddressAction } from '../../types/index.js';

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
        userId,
        addressId,
        config,
      );

      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { addressId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setUserDefaultBillingAddressFactory;
