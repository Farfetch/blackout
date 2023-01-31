import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import subscriptionSchema from '../../../entities/schemas/subscription';

/**
 * @callback GetSubscriptionPackagesThunkFactory
 *
 * @alias GetSubscriptionPackagesThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {object} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 *
 * @function doGetSubscriptionPackages
 * @memberof module:subscriptions/actions
 *
 * @param {Function} getSubscriptionPackages - Get subscription packages client.
 *
 * @returns {GetSubscriptionPackagesThunkFactory} Thunk factory.
 */
export default getSubscriptionPackages => (query, config) => async dispatch => {
  dispatch({
    type: actionTypes.GET_SUBSCRIPTION_PACKAGES_REQUEST,
  });

  try {
    const result = await getSubscriptionPackages(query, config);
    dispatch({
      payload: normalize(result, subscriptionSchema),
      type: actionTypes.GET_SUBSCRIPTION_PACKAGES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_SUBSCRIPTION_PACKAGES_FAILURE,
    });

    throw error;
  }
};
