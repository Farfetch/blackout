import * as actionTypes from '../../actionTypes.js';
import {
  type GetSubscriptionsVNext,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { FetchUserSubscriptionsFactoryVNext } from './types/index.js';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param getSubscriptionsVNext - Get subscriptions client.
 *
 * @returns Thunk factory.
 */
const fetchUserSubscriptionsFactoryVNext: FetchUserSubscriptionsFactoryVNext<
  GetSubscriptionsVNext
> = getSubscriptions => (query, config) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST_VNEXT,
    });

    const result = await getSubscriptions(query, config);

    dispatch({
      payload: result,
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS_VNEXT,
    });

    return result;
  } catch (error) {
    const errorAsBlackoutError = toBlackoutError(error);

    dispatch({
      payload: { error: errorAsBlackoutError },
      type: actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE_VNEXT,
    });

    throw errorAsBlackoutError;
  }
};

export default fetchUserSubscriptionsFactoryVNext;
