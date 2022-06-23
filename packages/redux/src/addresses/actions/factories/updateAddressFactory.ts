import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';
import type {
  Address,
  PutAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Dispatch } from 'redux';
import type { UpdateAddressAction } from '../../types';

/**
 * @param addressId - Identifier of the address.
 * @param userId    - Identifier of the user.
 * @param data      - Object containing the address information.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates the address information with the specified 'addressId'.
 *
 * @param putAddress - Put address client.
 *
 * @returns Thunk factory.
 */
const updateAddressFactory =
  (putAddress: PutAddress) =>
  (
    userId: User['id'],
    addressId: Address['id'],
    data: Address,
    config?: Config,
  ) =>
  async (dispatch: Dispatch<UpdateAddressAction>): Promise<Address> => {
    try {
      dispatch({
        meta: { addressId },
        type: actionTypes.UPDATE_ADDRESS_REQUEST,
      });

      const result = await putAddress({ userId, id: addressId }, data, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: actionTypes.UPDATE_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default updateAddressFactory;
