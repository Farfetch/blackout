import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserAddress,
  toBlackoutError,
  type User,
  type UserAddress,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../../entities/schemas/addresses.js';
import type { Dispatch } from 'redux';
import type { FetchUserAddressAction } from '../../types/index.js';

/**
 * Gets the details of the user address with the specified 'addressId'.
 *
 * @param getUserAddress - Get user address client.
 *
 * @returns Thunk factory.
 */
const fetchUserAddressFactory =
  (getUserAddress: GetUserAddress) =>
  (userId: User['id'], addressId: UserAddress['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchUserAddressAction>): Promise<UserAddress> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.FETCH_USER_ADDRESS_REQUEST,
      });

      const result = await getUserAddress({ id: addressId, userId }, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: actionTypes.FETCH_USER_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { addressId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserAddressFactory;
