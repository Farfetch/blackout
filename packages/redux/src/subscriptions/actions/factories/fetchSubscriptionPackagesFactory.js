import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import subscriptionSchema from '../../../entities/schemas/subscriptions';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @function fetchSubscriptionPackagesFactory
 * @memberof module:subscriptions/actions/factories
 *
 * @param {Function} getSubscriptionPackages - Get subscription packages client.
 *
 * @returns {FetchSubscriptionPackagesThunkFactory} Thunk factory.
 */
export default getSubscriptionPackages => (query, config) => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
  });

  try {
    const result = await getSubscriptionPackages(query, config);

    dispatch({
      payload: normalize(result, subscriptionSchema),
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
    });
    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
    });

    throw error;
  }
};
