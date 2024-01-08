import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteUserDefaultShippingAddress,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import { getDefaultAddress } from '../../reducer.js';
import type { Dispatch } from 'redux';
import type { RemoveUserDefaultShippingAddressAction } from '../../types/index.js';
import type { StoreState } from '../../../../index.js';

/**
 * Responsible for deleting the users default Shipping address.
 *
 * @param deleteUserDefaultShippingAddress - Delete default Shipping address client.
 *
 * @returns Thunk factory.
 */
const removeUserDefaultShippingAddressFactory =
  (deleteUserDefaultShippingAddress: DeleteUserDefaultShippingAddress) =>
  (userId: User['id'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveUserDefaultShippingAddressAction>,
    getState: () => StoreState,
  ): Promise<number> => {
    let addressId;

    try {
      addressId = getDefaultAddress(
        getState()?.entities?.addresses,
        'isCurrentShipping',
      )?.id;

      if (!addressId) {
        throw new Error('There is no current default shipping address');
      }

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      });

      const result = await deleteUserDefaultShippingAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      if (addressId) {
        dispatch({
          meta: { userId, addressId },
          payload: { error: errorAsBlackoutError },
          type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
        });
      }

      throw errorAsBlackoutError;
    }
  };

export default removeUserDefaultShippingAddressFactory;
