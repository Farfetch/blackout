import * as actionTypes from '../actionTypes';

/**
 * @callback UpdateUserSubscriptionsThunkFactory
 *
 * @alias UpdateUserSubscriptionsThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {object} [data={}] - Necessary data for put subscriptions's request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for putting subscription data.
 *
 * @function doUpdateUserSubscriptions
 * @memberof module:subscriptions/actions
 *
 * @param {Function} putSubscriptions - Put subscriptions client.
 *
 * @returns {UpdateUserSubscriptionsThunkFactory} Thunk factory.
 */
export default putSubscriptions =>
  (data = {}, config) =>
  async dispatch => {
    dispatch({
      type: actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST,
    });

    try {
      const result = await putSubscriptions(data, config);

      dispatch({
        payload: result,
        type: actionTypes.PUT_USER_SUBSCRIPTIONS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.PUT_USER_SUBSCRIPTIONS_FAILURE,
      });

      throw error;
    }
  };
