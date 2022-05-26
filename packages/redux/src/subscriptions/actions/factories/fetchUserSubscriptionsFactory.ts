import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { FetchUserSubscriptionsFactory } from './types';
import type { GetSubscriptions } from '@farfetch/blackout-client/subscriptions/types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param getSubscriptions - Get subscriptions client.
 *
 * @returns Thunk factory.
 */
const fetchUserSubscriptionsFactory: FetchUserSubscriptionsFactory<
  GetSubscriptions
> = getSubscriptions => (query, config) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST,
    });

    const result = await getSubscriptions(query, config);

    dispatch({
      payload: result,
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS,
    });
    return result;
  } catch (error) {
    dispatch({
      payload: { error: toError(error) },
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};

export default fetchUserSubscriptionsFactory;
