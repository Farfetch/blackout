import {
  FETCH_ADDRESS_FAILURE,
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';
import type {
  Address,
  GetAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchAddressAction } from '../../types';

/**
 * @param addressId - Identifier of the address.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Gets the details of the address with the specified 'addressId'.
 *
 * @param getAddress - Get address client.
 *
 * @returns Thunk factory.
 */
const fetchAddressFactory =
  (getAddress: GetAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchAddressAction>): Promise<Address> => {
    dispatch({
      meta: { addressId },
      type: FETCH_ADDRESS_REQUEST,
    });

    try {
      const result = await getAddress({ id: addressId, userId }, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: FETCH_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: FETCH_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default fetchAddressFactory;
