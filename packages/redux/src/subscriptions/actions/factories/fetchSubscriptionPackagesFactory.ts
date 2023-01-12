import * as actionTypes from '../../actionTypes';
import {
  GetSubscriptionPackages,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import buildSubscriptionPackagesHash from '../../helpers/buildSubscriptionPackagesHash';
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
  const hash = buildSubscriptionPackagesHash(query);

  try {
    dispatch({
      meta: { hash },
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
    });

    const result = await getSubscriptionPackages(query, config);

    dispatch({
      meta: { hash },
      payload: normalize(result, subscriptionSchema),
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
    });
    return result;
  } catch (error) {
    const errorAsBlackoutError = toBlackoutError(error);

    dispatch({
      meta: { hash },
      payload: { error: errorAsBlackoutError },
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
    });

    throw errorAsBlackoutError;
  }
};

export default fetchSubscriptionPackagesFactory;
