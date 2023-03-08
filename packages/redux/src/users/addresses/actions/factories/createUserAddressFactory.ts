import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostUserAddress,
  toBlackoutError,
  type User,
  type UserAddress,
  type UserAddressInput,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../../entities/schemas/addresses.js';
import type { CreateUserAddressAction } from '../../types/actions.types.js';
import type { Dispatch } from 'redux';

/**
 * Responsible for creating an address for the current user.
 *
 * @param postAddress - PostAddress client.
 *
 * @returns Thunk factory.
 */
const createUserAddressFactory =
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_USER_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createUserAddressFactory;
