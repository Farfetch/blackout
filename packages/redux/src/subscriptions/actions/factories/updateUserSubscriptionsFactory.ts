import * as actionTypes from '../../actionTypes.js';
import {
  type PutSubscriptions,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { UpdateUserSubscriptionsFactory } from './types/index.js';

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
    const errorAsBlackoutError = toBlackoutError(error);

    dispatch({
      payload: { error: errorAsBlackoutError },
      type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE,
    });

    throw errorAsBlackoutError;
  }
};

export default updateUserSubscriptionsFactory;
