import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import addressesSchema from '../../../entities/schemas/addresses';
import type {
  Address,
  PutAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
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
        payload: { error: toError(error) },
        type: actionTypes.UPDATE_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default updateAddressFactory;
