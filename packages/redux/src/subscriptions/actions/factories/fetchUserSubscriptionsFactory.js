import * as actionTypes from '../../actionTypes';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @function fetchUserSubscriptionsFactory
 * @memberof module:subscriptions/actions/factories
 *
 * @param {Function} getSubscriptions - Get subscriptions client.
 *
 * @returns {FetchUserSubscriptionsThunkFactory} Thunk factory.
 */
export default getSubscriptions => (query, config) => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST,
  });

  try {
    const result = await getSubscriptions(query, config);

    dispatch({
      payload: result,
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS,
    });
    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};
