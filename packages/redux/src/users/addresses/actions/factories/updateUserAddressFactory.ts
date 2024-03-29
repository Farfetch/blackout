import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PutUserAddress,
  toBlackoutError,
  type User,
  type UserAddress,
  type UserAddressInput,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../../entities/schemas/addresses.js';
import type { Dispatch } from 'redux';
import type { UpdateUserAddressAction } from '../../types/index.js';

/**
 * Updates the user address information with the specified 'addressId'.
 *
 * @param putUserAddress - Put user address client.
 *
 * @returns Thunk factory.
 */
const updateUserAddressFactory =
  (putAddress: PutUserAddress) =>
  (
    userId: User['id'],
    addressId: UserAddress['id'],
    data: UserAddressInput,
    config?: Config,
  ) =>
  async (dispatch: Dispatch<UpdateUserAddressAction>): Promise<UserAddress> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.UPDATE_USER_ADDRESS_REQUEST,
      });

      const result = await putAddress({ userId, id: addressId }, data, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { addressId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_USER_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateUserAddressFactory;
