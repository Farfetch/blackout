import * as actionTypes from '../../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../../entities/schemas/addresses';
import type {
  Address,
  PostUserAddress,
  User,
} from '@farfetch/blackout-client/src/users/addresses/types';
import type { CreateUserAddressAction } from '../../../types';
import type { Dispatch } from 'redux';

/**
 * @param userId - Identifier of the user.
 * @param data   - Object containing the address information.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for creating an address for the current user.
 *
 * @param postAddress - PostAddress client.
 *
 * @returns Thunk factory.
 */
export const createUserAddressFactory =
  (postAddress: PostUserAddress) =>
  (userId: User['id'], data: Address, config?: Config) =>
  async (dispatch: Dispatch<CreateUserAddressAction>): Promise<Address> => {
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
