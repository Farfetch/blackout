import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteUserDefaultBillingAddress,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import { getDefaultAddress } from '../../reducer.js';
import type { Dispatch } from 'redux';
import type { RemoveUserDefaultBillingAddressAction } from '../../types/index.js';
import type { StoreState } from '../../../../index.js';

/**
 * Responsible for deleting the users default billing address.
 *
 * @param deleteUserDefaultBillingAddress - Delete default Billing address client.
 *
 * @returns Thunk factory.
 */
const removeUserDefaultBillingAddressFactory =
  (deleteUserDefaultBillingAddress: DeleteUserDefaultBillingAddress) =>
  (userId: User['id'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveUserDefaultBillingAddressAction>,
    getState: () => StoreState,
  ): Promise<number> => {
    let addressId;

    try {
      addressId = getDefaultAddress(
        getState()?.entities?.addresses,
        'isCurrentBilling',
      )?.id;

      if (!addressId) {
        throw new Error('There is no current default billing address');
      }

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
      });

      const result = await deleteUserDefaultBillingAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      if (addressId) {
        dispatch({
          meta: { userId, addressId },
          payload: { error: errorAsBlackoutError },
          type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
        });
      }

      throw errorAsBlackoutError;
    }
  };

export default removeUserDefaultBillingAddressFactory;
