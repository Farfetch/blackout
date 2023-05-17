import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PutUserDefaultShippingAddress,
  toBlackoutError,
  type User,
  type UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetUserDefaultShippingAddressAction } from '../../types/index.js';

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 *
 * @param putDefaultShippingAddress - Put default shipping address client.
 *
 * @returns Thunk factory.
 */
const setUserDefaultShippingAddressFactory =
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

      const result = await putDefaultShippingAddress(userId, addressId, config);

      dispatch({
        meta: { addressId },
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { addressId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setUserDefaultShippingAddressFactory;
