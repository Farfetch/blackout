import {
  FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
  FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
  FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
} from '../../actionTypes';
import type {
  Address,
  GetDefaultContactAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchDefaultContactAddressAction } from '../../types';

/**
 * @param userId - Identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for obtaining the default contact address of the user.
 *
 * @param getDefaultContactAddress - Get default contact address client.
 *
 * @returns Thunk factory.
 */
const fetchDefaultContactAddressFactory =
  (getDefaultContactAddress: GetDefaultContactAddress) =>
  (userId: User['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchDefaultContactAddressAction>,
  ): Promise<Address> => {
    dispatch({
      type: FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
    });

    try {
      const result = await getDefaultContactAddress(userId, config);

      dispatch({
        payload: result,
        type: FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default fetchDefaultContactAddressFactory;
