import * as actionTypes from '../../actionTypes';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @function unsubscribeFromSubscriptionFactory
 * @param deleteSubscription
 * @memberof module:subscriptions/actions/factories
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
