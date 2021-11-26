import {
  FETCH_ADDRESSES_FAILURE,
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';

/**
 * @callback FetchAddressesThunkFactory
 * @param {number} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for getting all the addresses of the current user.
 *
 * @function doGetAddresses
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} getAddresses - Get addresses client.
 *
 * @returns {FetchAddressesThunkFactory} Thunk factory.
 */
export default getAddresses => (userId, config) => async dispatch => {
  dispatch({
    type: FETCH_ADDRESSES_REQUEST,
  });

  try {
    const result = await getAddresses({ userId }, config);

    dispatch({
      payload: normalize(result, [addressesSchema]),
      type: FETCH_ADDRESSES_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_ADDRESSES_FAILURE,
    });

    throw error;
  }
};
