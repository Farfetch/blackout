import * as actionTypes from '../../actionTypes';
import { PutSubscriptions, toBlackoutError } from '@farfetch/blackout-client';
import type { UpdateUserSubscriptionsFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param putSubscriptions - Put subscriptions client.
 *
 * @returns Thunk factory.
 */
export const updateUserSubscriptionsFactory: UpdateUserSubscriptionsFactory<
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
      payload: { error: toBlackoutError(error) },
      type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};
