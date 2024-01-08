import * as actionTypes from '../actionTypes.js';
import { getDefaultAddress } from '../reducer.js';

/**
 * @callback DeleteDefaultBillingAddressThunkFactory
 * @param {string} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for deleting the users default billing address.
 *
 * @function doDeleteDefaultBillingAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} deleteDefaultBillingAddress - Delete default billing address client.
 *
 * @returns {DeleteDefaultBillingAddressThunkFactory} Thunk factory.
 */

export default deleteDefaultBillingAddress =>
  (userId, config) =>
  async (dispatch, getState) => {
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
        type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_REQUEST,
      });

      const result = await deleteDefaultBillingAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      if (addressId) {
        dispatch({
          meta: { userId, addressId },
          payload: { error },
          type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_FAILURE,
        });
      }

      throw error;
    }
  };
