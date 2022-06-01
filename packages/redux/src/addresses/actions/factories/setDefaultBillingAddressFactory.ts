import {
  SET_DEFAULT_BILLING_ADDRESS_FAILURE,
  SET_DEFAULT_BILLING_ADDRESS_REQUEST,
  SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
} from '../../actionTypes';
import type {
  Address,
  PutDefaultBillingAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { SetDefaultBillingAddressAction } from '../../types';

/**
 * @param addressId - Identifier of the address.
 * @param userId    - Identifier of the user.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Sets the address specified with 'addressId', as the default billing address.
 *
 * @param putDefaultBillingAddress - Put default billing address client.
 *
 * @returns Thunk factory.
 */
const setDefaultBillingAddressFactory =
  (putDefaultBillingAddress: PutDefaultBillingAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (dispatch: Dispatch<SetDefaultBillingAddressAction>): Promise<void> => {
    dispatch({
      meta: { addressId },
      type: SET_DEFAULT_BILLING_ADDRESS_REQUEST,
    });

    try {
      const result = await putDefaultBillingAddress(
        { id: addressId, userId },
        config,
      );

      dispatch({
        meta: { addressId },
        type: SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: SET_DEFAULT_BILLING_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default setDefaultBillingAddressFactory;
