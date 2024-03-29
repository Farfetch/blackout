import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PutUserDefaultContactAddress,
  toBlackoutError,
  type User,
  type UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SetUserDefaultContactAddressAction } from '../../types/index.js';

/**
 * Sets the address specified with 'addressId', as the default contact address.
 *
 * @param putUserDefaultContactAddress - Put default contact address client.
 *
 * @returns Thunk factory.
 */
const setUserDefaultContactAddressFactory =
  (putUserDefaultContactAddress: PutUserDefaultContactAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (
    dispatch: Dispatch<SetUserDefaultContactAddressAction>,
  ): Promise<number> => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { addressId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setUserDefaultContactAddressFactory;
