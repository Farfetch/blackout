import {
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
} from '../actionTypes';
import { getUser } from '../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import addressesSchema from '../../../entities/schemas/addresses';

/**
 * @callback CreateAddressThunkFactory
 * @param {object} data - Object containing the address information.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for creating an address for the current user.
 *
 * @function doCreateAddress
 * @memberof module:addresses/actions
 *
 * @param {Function} postAddress - PostAddress client.
 *
 * @returns {CreateAddressThunkFactory} Thunk factory.
 */
export default postAddress => (data, config) => async (dispatch, getState) => {
  const state = getState();
  const userId = getUser(state).id;

  dispatch({
    type: CREATE_ADDRESS_REQUEST,
  });

  try {
    const result = await postAddress({ userId }, data, config);
    const normalizedResponse = normalize(result, addressesSchema);

    dispatch({
      meta: { addressId: result.id },
      payload: normalizedResponse,
      type: CREATE_ADDRESS_SUCCESS,
    });

    return normalizedResponse;
  } catch (error) {
    dispatch({
      payload: { error },
      type: CREATE_ADDRESS_FAILURE,
    });

    throw error;
  }
};
