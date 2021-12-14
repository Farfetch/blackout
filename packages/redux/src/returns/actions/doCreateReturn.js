import {
  CREATE_RETURN_FAILURE,
  CREATE_RETURN_REQUEST,
  CREATE_RETURN_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import returnSchema from '../../entities/schemas/return';

/**
 * @typedef {object} CreateReturnData
 * @property {object} [currentReturn] - Details of the return.
 */

/**
 * @typedef {object} CreateReturnQuery
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * @callback CreateReturnThunkFactory
 * @param {CreateReturnData} data  - Details of the Return to be created.
 * @param {CreateReturnQuery} query - Query parameters for creating the return.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating a return.
 *
 * @function doCreateReturn
 * @memberof module:returns/actions
 *
 * @param {Function} postReturn  - Post return client.
 *
 * @returns {CreateReturnThunkFactory} Thunk factory.
 */
export default postReturn => (data, query, config) => async dispatch => {
  dispatch({
    type: CREATE_RETURN_REQUEST,
  });

  try {
    const result = await postReturn(data, query, config);

    dispatch({
      payload: normalize(result, returnSchema),
      type: CREATE_RETURN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: CREATE_RETURN_FAILURE,
    });

    throw error;
  }
};
