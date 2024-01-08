import * as actionTypes from '../actionTypes.js';
import { getDefaultAddress } from '../reducer.js';

/**
 * @callback DeleteDefaultShippingAddressThunkFactory
 * @param {string} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for deleting the users default shipping address.
 *
 * @function doDeleteDefaultShippingAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} deleteDefaultShippingAddress - Delete default shipping address client.
 *
 * @returns {DeleteDefaultShippingAddressThunkFactory} Thunk factory.
 */

export default deleteDefaultShippingAddress =>
  (userId, config) =>
  async (dispatch, getState) => {
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
        type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      });

      const result = await deleteDefaultShippingAddress(userId, config);

      dispatch({
        meta: { userId, addressId },
        type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      if (addressId) {
        dispatch({
          meta: { userId, addressId },
          payload: { error },
          type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_FAILURE,
        });
      }

      throw error;
    }
  };
