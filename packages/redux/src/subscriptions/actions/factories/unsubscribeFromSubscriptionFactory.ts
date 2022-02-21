import * as actionTypes from '../../actionTypes';
import type { DeleteSubscription } from '@farfetch/blackout-client/subscriptions/types';
import type { UnsubscribeFromSubscriptionFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @function unsubscribeFromSubscriptionFactory
 * @memberof module:subscriptions/actions/factories
 *
 * @param deleteSubscription - Delete subscription client.
 * @returns Thunk factory.
 */
const unsubscribeFromSubscriptionFactory: UnsubscribeFromSubscriptionFactory<
  DeleteSubscription
> = deleteSubscription => (query, config) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST,
    });

    await deleteSubscription(query, config);

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

export default unsubscribeFromSubscriptionFactory;
