import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import subscriptionSchema from '../../../entities/schemas/subscriptions';
import type { FetchSubscriptionPackagesFactory } from './types';
import type { GetSubscriptionPackages } from '@farfetch/blackout-client/subscriptions/types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param getSubscriptionPackages - Get subscription packages client.
 *
 * @returns Thunk factory.
 */
const fetchSubscriptionPackagesFactory: FetchSubscriptionPackagesFactory<
  GetSubscriptionPackages
> = getSubscriptionPackages => (query, config) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
    });

    const result = await getSubscriptionPackages(query, config);

    dispatch({
      payload: normalize(result, subscriptionSchema),
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
    });
    return result;
  } catch (error) {
    dispatch({
      payload: { error: toError(error) },
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
    });

    throw error;
  }
};

export default fetchSubscriptionPackagesFactory;
