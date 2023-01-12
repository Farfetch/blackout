import * as actionTypes from '../../actionTypes';
import { DeleteSubscription, toBlackoutError } from '@farfetch/blackout-client';
import type { UnsubscribeSubscriptionFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param deleteSubscription - Delete subscription client.
 *
 * @returns Thunk factory.
 */
const unsubscribeSubscriptionFactory: UnsubscribeSubscriptionFactory<
  DeleteSubscription
> = deleteSubscription => (query, config) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_REQUEST,
    });

    const result = await deleteSubscription(query, config);

    dispatch({
      type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_SUCCESS,
    });

    return result;
  } catch (error) {
    const errorAsBlackoutError = toBlackoutError(error);

    dispatch({
      payload: { error: errorAsBlackoutError },
      type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_FAILURE,
    });

    throw errorAsBlackoutError;
  }
};

export default unsubscribeSubscriptionFactory;
