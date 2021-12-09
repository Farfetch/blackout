/**
 * @module subscriptions/selectors
 * @category Subscriptions
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import { getEntity } from '../../entities/redux/selectors';
import {
  getPackages,
  getPackagesError,
  getPackagesIsLoading,
} from './reducer/packages';
import {
  getSubscriptions,
  getSubscriptionsError,
  getSubscriptionsIsLoading,
  getUnsubscribeRecipientFromTopicRequests as getUnsubscribeRecipientFromTopicRequestsReducer,
} from './reducer/user';
import defaultTo from 'lodash/defaultTo';
import get from 'lodash/get';

/**
 * Returns the error given a user subscription action.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} User subscription error.
 */
export const getUserSubscriptionsError = state =>
  getSubscriptionsError(state.subscriptions.user);

/**
 * Returns the result of a user subscription.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User subscription result.
 */
export const getUserSubscriptions = state =>
  getSubscriptions(state.subscriptions.user);

// Default user subscriptions value for the following selectors.
// It is outside of each selector to keep reference integrity.
const DEFAULT_USER_SUBSCRIPTIONS_VALUE = [];
/**
 * Returns the user subscribed topics for the specified platform.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} platform - Platform to filter the subscriptions.
 *
 * @returns {Array} User subscribed topics for the specified platform.
 */
export const getUserSubscribedTopicsForPlatform = createSelector(
  state =>
    defaultTo(getUserSubscriptions(state), DEFAULT_USER_SUBSCRIPTIONS_VALUE),
  (_, platform) => platform,
  (userSubscriptions, platform) => {
    const allTopicsForPlatform = userSubscriptions.reduce(
      (accum, subscription) => {
        const topics = subscription.topics;

        const topicsForPlatform = topics.filter(topic => {
          return !!topic.channels.find(
            channel => channel.platform === platform,
          );
        });

        accum.push(...topicsForPlatform);

        return accum;
      },
      [],
    );

    return allTopicsForPlatform;
  },
);

/**
 * Returns the user subscribed topics for the specified address.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} address - Address to filter the subscriptions.
 *
 * @returns {Array} User subscribed topics for the specified address.
 */
export const getUserSubscribedTopicsForAddress = createSelector(
  state =>
    defaultTo(getUserSubscriptions(state), DEFAULT_USER_SUBSCRIPTIONS_VALUE),
  (_, address) => address,
  (userSubscriptions, address) => {
    const allTopicsForAddress = userSubscriptions.reduce(
      (accum, subscription) => {
        const topics = subscription.topics;

        const topicsForAddress = topics.filter(topic => {
          return !!topic.channels.find(channel => channel.address === address);
        });

        accum.push(...topicsForAddress);

        return accum;
      },
      [],
    );

    return allTopicsForAddress;
  },
);

/**
 * Returns the loading status of a user subscription.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} User subscription loading status.
 */
export const isUserSubscriptionsLoading = state =>
  getSubscriptionsIsLoading(state.subscriptions.user);

/**
 * Returns the error given a subscription package action.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Subscription package error.
 */
export const getSubscriptionPackagesError = state =>
  defaultTo(getPackagesError(state.subscriptions.packages), undefined);

/**
 * Returns the result of a subscription package.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} Subscription package result.
 */
export const getSubscriptionPackages = createSelector(
  state => getPackages(state.subscriptions.packages),
  state => getEntity(state, 'subscriptionPackages'),
  (subscriptionPackagesResult, subscriptionPackagesEntity) => {
    return (
      subscriptionPackagesResult &&
      subscriptionPackagesResult.packages
        .map(packageId => get(subscriptionPackagesEntity, packageId))
        .filter(Boolean)
    );
  },
);

/**
 * Returns the loading status of a subscription package.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Subscription package loading status.
 */
export const isSubscriptionPackagesLoading = state =>
  getPackagesIsLoading(state.subscriptions.packages);

/**
 * Returns the supported delivery channels for all subscription packages.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} The supported delivery channels.
 */
export const getSupportedChannels = state => {
  const result = getPackages(state.subscriptions.packages);

  return result && result.supportedChannels;
};

/**
 * Returns a specific unsubscribe recipient from topic request state from the redux store.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} recipientId - Id of the recipient (address) to get the unsubscribe request state.
 *
 * @returns {object|undefined} The unsubscribe request state if available on the redux store or undefined.
 */
export const getUnsubscribeRecipientFromTopicRequest = (state, recipientId) => {
  const unsubscribeRecipientFromTopicRequests =
    getUnsubscribeRecipientFromTopicRequestsReducer(state.subscriptions.user);

  return unsubscribeRecipientFromTopicRequests[recipientId];
};

/**
 * Returns all unsubscribe recipient from topic requests state from the redux store.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} All unsubscribe recipient from topic requests state.
 */
export const getUnsubscribeRecipientFromTopicRequests = createSelector(
  state =>
    getUnsubscribeRecipientFromTopicRequestsReducer(state.subscriptions.user),
  unsubscribeRecipientFromTopicRequests =>
    Object.entries(unsubscribeRecipientFromTopicRequests).map(
      ([recipientId, unsubscribeRequestState]) => {
        return {
          ...unsubscribeRequestState,
          recipientId,
        };
      },
    ),
);
