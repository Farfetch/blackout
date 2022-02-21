import * as actionTypes from '../../actionTypes';
import type { PutSubscriptions } from '@farfetch/blackout-client/subscriptions/types';
import type { UpdateUserSubscriptionsFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @function updateUserSubscriptionsFactory
 * @memberof module:subscriptions/actions/factories
 *
 * @param putSubscriptions - Put subscriptions client.
 *
 * @returns Thunk factory.
 */
const updateUserSubscriptionsFactory: UpdateUserSubscriptionsFactory<
  PutSubscriptions
> = putSubscriptions => (data, config) => async dispatch => {
  dispatch({
    type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST,
  });

  try {
    const result = await putSubscriptions(data, config);

    dispatch({
      payload: result,
      type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS,
    });
    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};

export default updateUserSubscriptionsFactory;
