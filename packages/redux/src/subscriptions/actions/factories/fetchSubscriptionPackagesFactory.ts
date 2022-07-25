import * as actionTypes from '../../actionTypes';
import {
  GetSubscriptionPackages,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import subscriptionSchema from '../../../entities/schemas/subscriptions';
import type { FetchSubscriptionPackagesFactory } from './types';

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
      payload: { error: toBlackoutError(error) },
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
    });

    throw error;
  }
};

export default fetchSubscriptionPackagesFactory;
