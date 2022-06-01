import {
  FETCH_ADDRESSES_FAILURE,
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';
import type {
  Address,
  GetAddresses,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchAddressesAction } from '../../types';

/**
 * @param userId - Identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for getting all the addresses of the current user.
 *
 * @param getAddresses - Get addresses client.
 *
 * @returns Thunk factory.
 */
const fetchAddressesFactory =
  (getAddresses: GetAddresses) =>
  (userId: User['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchAddressesAction>): Promise<Address[]> => {
    dispatch({
      type: FETCH_ADDRESSES_REQUEST,
    });

    try {
      const result = await getAddresses({ userId }, config);

      dispatch({
        payload: normalize(result, [addressesSchema]),
        type: FETCH_ADDRESSES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_ADDRESSES_FAILURE,
      });

      throw error;
    }
  };

export default fetchAddressesFactory;
