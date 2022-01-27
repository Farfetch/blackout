import * as actionTypes from '../actionTypes';

/**
 * @callback UnsubscribeFromSubscriptionThunkFactory
 *
 * @alias UnsubscribeFromSubscriptionThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {object} query - Query object.
 * @param {string} query.id - The identifier of the subscription.
 * @param {string} query.emailHash - SHA256 hash of the user's email to be unsubscribed.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for unsubscribing a subscription that was made
 * for the subscription id and email hash passed in.
 *
 * @function doUnsubscribeFromSubscription
 * @param deleteSubscription
 * @memberof module:subscriptions/actions
 * @param {Function} deleteSubscription - Delete subscription client.
 * @returns {UnsubscribeFromSubscriptionThunkFactory} Thunk factory.
 */
export default deleteSubscription =>
  ({ id, emailHash }, config) =>
  async dispatch => {
    try {
      dispatch({
        type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST,
      });

      await deleteSubscription({ id, emailHash }, config);

      dispatch({
        type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE,
      });

      throw error;
    }
  };
