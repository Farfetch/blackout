import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserDefaultContactAddress,
  toBlackoutError,
  type User,
  type UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserDefaultContactAddressAction } from '../../types/index.js';

/**
 * Responsible for obtaining the default contact address of the user.
 *
 * @param getUserDefaultContactAddress - Get default contact address client.
 *
 * @returns Thunk factory.
 */
const fetchUserDefaultContactAddressFactory =
  (getUserDefaultContactAddress: GetUserDefaultContactAddress) =>
  (userId: User['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchUserDefaultContactAddressAction>,
  ): Promise<UserAddress> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      });

      const result = await getUserDefaultContactAddress(userId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserDefaultContactAddressFactory;
