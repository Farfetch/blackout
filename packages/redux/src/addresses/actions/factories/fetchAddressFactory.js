import {
  FETCH_ADDRESS_FAILURE,
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';

/**
 * @callback FetchAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the details of the address with the specified 'addressId'.
 *
 * @function doGetAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} getAddress - Get address client.
 *
 * @returns {FetchAddressThunkFactory} Thunk factory.
 */
export default getAddress => (userId, addressId, config) => async dispatch => {
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
