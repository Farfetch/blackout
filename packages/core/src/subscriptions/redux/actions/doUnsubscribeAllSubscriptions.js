import * as actionTypes from '../actionTypes';

/**
 * @callback UnsubscribeAllSubscriptionsThunkFactory
 *
 * @alias UnsubscribeAllSubscriptionsThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param   {string} emailHash - SHA256 hash of the user's email to be unsubscribed.
 * @param   {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for unsubscribing all subscriptions that were made
 * for the email hash passed in.
 *
 * @function doUnsubscribeAllSubscriptions
 * @memberof module:subscriptions/actions
 *
 * @param {Function} deleteSubscriptions - Delete subscriptions client.
 *
 * @returns {UnsubscribeAllSubscriptionsThunkFactory} Thunk factory.
 */
export default deleteSubscriptions => (emailHash, config) => async dispatch => {
  dispatch({
    type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST,
  });

  try {
    await deleteSubscriptions(emailHash, config);

    dispatch({
      type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};
