import {
  GET_ADDRESSES_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
} from '../actionTypes';
import { getUser } from '../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';

/**
 * @callback GetAddressesThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for getting all the addresses of the current user.
 *
 * @function doGetAddresses
 * @memberof module:addresses/actions
 *
 * @param {Function} getAddresses - Get addresses client.
 *
 * @returns {GetAddressesThunkFactory} Thunk factory.
 */
export default getAddresses => config => async (dispatch, getState) => {
  const state = getState();
  const userId = getUser(state).id;

  dispatch({
    type: GET_ADDRESSES_REQUEST,
  });

  try {
    const result = await getAddresses({ userId }, config);

    dispatch({
      payload: normalize(result, [addressesSchema]),
      type: GET_ADDRESSES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_ADDRESSES_FAILURE,
    });

    throw error;
  }
};
