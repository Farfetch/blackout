import { normalize } from 'normalizr';
import {
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
} from '../../actionTypes';
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
 * @callback UpdateAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {number} userId - Identifier of the user.
 * @param {object} data - Object containing the address information.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates the address information with the specified 'addressId'.
 *
 * @function doUpdateAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} putAddress - Put address client.
 *
 * @returns {UpdateAddressThunkFactory} Thunk factory.
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
    dispatch({
      meta: { addressId },
      type: UPDATE_ADDRESS_REQUEST,
    });

    try {
      const result = await putAddress({ userId, id: addressId }, data, config);

      dispatch({
        meta: { addressId },
        payload: normalize(result, addressesSchema),
        type: UPDATE_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: UPDATE_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default updateAddressFactory;
