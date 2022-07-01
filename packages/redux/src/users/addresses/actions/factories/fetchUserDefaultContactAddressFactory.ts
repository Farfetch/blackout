import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserDefaultContactAddress,
  toBlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserDefaultContactAddressAction } from '../../types';

/**
 * @param userId - Identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for obtaining the default contact address of the user.
 *
 * @param getUserDefaultContactAddress - Get default contact address client.
 *
 * @returns Thunk factory.
 */
export const fetchUserDefaultContactAddressFactory =
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };
