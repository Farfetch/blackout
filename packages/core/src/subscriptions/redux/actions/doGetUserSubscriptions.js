import * as actionTypes from '../actionTypes';

/**
 * @callback GetUserSubscriptionsThunkFactory
 *
 * @alias GetUserSubscriptionsThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {object} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 *
 * @function doGetUserSubscriptions
 * @memberof module:subscriptions/actions
 *
 * @param {Function} getSubscriptions - Get subscriptions client.
 *
 * @returns {GetUserSubscriptionsThunkFactory} Thunk factory.
 */
export default getSubscriptions => (query, config) => async dispatch => {
  dispatch({
    type: actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST,
  });

  try {
    const result = await getSubscriptions(query, config);

    dispatch({
      payload: result,
      type: actionTypes.GET_USER_SUBSCRIPTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_USER_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};
