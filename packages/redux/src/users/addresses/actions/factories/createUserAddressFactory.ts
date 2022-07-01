import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUserAddress,
  toBlackoutError,
  User,
  UserAddress,
  UserAddressInput,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../../entities/schemas/addresses';
import type { CreateUserAddressAction } from '../../types/action.types';
import type { Dispatch } from 'redux';

/**
 * Responsible for creating an address for the current user.
 *
 * @param postAddress - PostAddress client.
 *
 * @returns Thunk factory.
 */
export const createUserAddressFactory =
  (postAddress: PostUserAddress) =>
  (userId: User['id'], data: UserAddressInput, config?: Config) =>
  async (dispatch: Dispatch<CreateUserAddressAction>): Promise<UserAddress> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_ADDRESS_REQUEST,
      });
      const result = await postAddress({ userId }, data, config);

      dispatch({
        meta: { addressId: result.id },
        payload: normalize(result, addressesSchema),
        type: actionTypes.CREATE_USER_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
