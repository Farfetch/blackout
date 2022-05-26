import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { PutSubscriptions } from '@farfetch/blackout-client/subscriptions/types';
import type { UpdateUserSubscriptionsFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param putSubscriptions - Put subscriptions client.
 *
 * @returns Thunk factory.
 */
const updateUserSubscriptionsFactory: UpdateUserSubscriptionsFactory<
  PutSubscriptions
> = putSubscriptions => (data, config) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST,
    });

    await putSubscriptions(data, config);

    dispatch({
      type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error: toError(error) },
      type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};

export default updateUserSubscriptionsFactory;
