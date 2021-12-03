import {
  SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
  SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
  SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
} from '../../actionTypes';
import type {
  Address,
  PutDefaultShippingAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { SetDefaultShippingAddressAction } from '../../types';

/**
 * @callback SetDefaultShippingAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {number} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 *
 * @function doSetDefaultShippingAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} putDefaultShippingAddress - Put default shipping
 * address client.
 *
 * @returns {SetDefaultShippingAddressThunkFactory} Thunk factory.
 */
const setDefaultShippingAddressFactory =
  (putDefaultShippingAddress: PutDefaultShippingAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (
    dispatch: Dispatch<SetDefaultShippingAddressAction>,
  ): Promise<void> => {
    dispatch({
      meta: { addressId },
      type: SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
    });

    try {
      const result = await putDefaultShippingAddress(
        { userId, id: addressId },
        config,
      );

      dispatch({
        meta: { addressId },
        type: SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default setDefaultShippingAddressFactory;
