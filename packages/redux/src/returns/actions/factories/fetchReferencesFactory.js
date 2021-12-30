import {
  FETCH_REFERENCES_FAILURE,
  FETCH_REFERENCES_REQUEST,
  FETCH_REFERENCES_SUCCESS,
} from '../../actionTypes';

/**
 * @typedef {object} GetReferencesQuery
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * @callback GetReferencesThunkFactory
 * @param {string} id - Return identifier.
 * @param {string} name - Reference name. Possible values: `ReturnNote`,
 * `ReturnCustomerRequestedAWB`,`ReturnLabelAWB`, `DropOffLocationsPage`.
 * @param {GetReferencesQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining a specific return reference.
 *
 * @function fetchReferences
 * @memberof module:returns/actions
 *
 * @param {Function} getReferences - Get references client.
 *
 * @returns {GetReferencesThunkFactory} Thunk factory.
 */
export default getReferences => (id, name, query, config) => async dispatch => {
  dispatch({
    type: FETCH_REFERENCES_REQUEST,
  });

  try {
    const result = await getReferences(id, name, query, config);

    dispatch({
      type: FETCH_REFERENCES_SUCCESS,
    });
    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_REFERENCES_FAILURE,
    });

    throw error;
  }
};
