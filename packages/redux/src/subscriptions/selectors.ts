import * as subscriptionPackagesReducer from './reducer/subscriptionPackages';
import * as userSubscriptionReducer from './reducer/userSubscriptions';
import { createSelector } from 'reselect';
import { getEntities } from '../entities';
import defaultTo from 'lodash/defaultTo';
import get from 'lodash/get';
import type { StoreState } from '../types';
import type { SubscriptionsState } from './types';
import type { SubscriptionTopic } from '@farfetch/blackout-client';

// Default user subscriptions value for the following selectors.
// It is outside of each selector to keep reference integrity.
const DEFAULT_USER_SUBSCRIPTIONS_VALUE: SubscriptionsState['user']['result'] =
  [];

/**
 * Returns the error given a user subscription action.
 *
 * @param state - Application state.
 *
 * @returns User subscription error.
 */
export const getUserSubscriptionsError = (state: StoreState) =>
  userSubscriptionReducer.getUserSubscriptionsError(state.subscriptions?.user);

/**
 * Returns the error when the update user subscriptions action fails.
 *
 * @param state - Application state.
 *
 * @returns Error for the update subscription action.
 */
export const getUpdateUserSubscriptionsError = (state: StoreState) =>
  userSubscriptionReducer.getUpdateSubscriptionsError(
    state.subscriptions?.user,
  );

/**
 * Returns the result of a user subscription.
 *
 * @param state - Application state.
 *
 * @returns User subscription result.
 */
export const getUserSubscriptions = (state: StoreState) =>
  userSubscriptionReducer.getUserSubscriptions(state.subscriptions?.user);

/**
 * Returns the user subscribed topics for the specified platform.
 *
 * @param state    - Application state.
 * @param platform - Platform to filter the subscriptions.
 *
 * @returns User subscribed topics for the specified platform.
 */
export const getUserSubscribedTopicsForPlatform = createSelector(
  (state: StoreState) =>
    defaultTo(getUserSubscriptions(state), DEFAULT_USER_SUBSCRIPTIONS_VALUE),
  (_: unknown, platform: string) => platform,
  (userSubscriptions, platform) => {
    const allTopicsForPlatform = userSubscriptions.reduce(
      (accum: SubscriptionTopic[], subscription) => {
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
 * @param state   - Application state.
 * @param address - Address to filter the subscriptions.
 *
 * @returns User subscribed topics for the specified address.
 */
export const getUserSubscribedTopicsForAddress = createSelector(
  (state: StoreState) =>
    defaultTo(getUserSubscriptions(state), DEFAULT_USER_SUBSCRIPTIONS_VALUE),
  (_: unknown, address: string) => address,
  (userSubscriptions, address) => {
    const allTopicsForAddress = userSubscriptions.reduce(
      (accum: SubscriptionTopic[], subscription) => {
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
 * @param state - Application state.
 *
 * @returns User subscription loading status.
 */
export const isUserSubscriptionsLoading = (state: StoreState) =>
  userSubscriptionReducer.getUserSubscriptionsIsLoading(
    state.subscriptions?.user,
  );

/**
 * Returns the error given a subscription package action.
 *
 * @param state - Application state.
 *
 * @returns Subscription package error.
 */
export const getSubscriptionPackagesError = (
  state: StoreState,
): SubscriptionsState['packages']['error'] =>
  defaultTo(
    subscriptionPackagesReducer.getSubscriptionPackagesError(
      state.subscriptions?.packages,
    ),
    null,
  );

/**
 * Returns the result of a subscription package.
 *
 * @param state - Application state.
 *
 * @returns Subscription package result.
 */
export const getSubscriptionPackages = createSelector(
  (state: StoreState) =>
    subscriptionPackagesReducer.getSubscriptionPackages(
      state.subscriptions?.packages,
    ),
  (state: StoreState) => getEntities(state, 'subscriptionPackages'),
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
 * @param state - Application state.
 *
 * @returns Subscription package loading status.
 */
export const areSubscriptionPackagesLoading = (
  state: StoreState,
): SubscriptionsState['packages']['isLoading'] | undefined =>
  subscriptionPackagesReducer.getSubscriptionPackagesIsLoading(
    state.subscriptions?.packages,
  );

/**
 * Returns the supported delivery channels for all subscription packages.
 *
 * @param state - Application state.
 *
 * @returns The supported delivery channels.
 */
export const getSubscriptionPackagesSupportedChannels = (state: StoreState) => {
  const result = subscriptionPackagesReducer.getSubscriptionPackages(
    state.subscriptions?.packages,
  );

  return (result && result.supportedChannels) || undefined;
};

/**
 * Returns a specific unsubscribe recipient from topic request state from the redux
 * store.
 *
 * @param state       - Application state.
 * @param recipientId - Id of the recipient (address) to get the unsubscribe request state.
 *
 * @returns The unsubscribe request state if available on the redux store or undefined.
 */
export const getUnsubscribeRecipientFromTopicRequest = (
  state: StoreState,
  recipientId: string,
) => {
  const unsubscribeRecipientFromTopicRequests =
    userSubscriptionReducer.getUnsubscribeRecipientFromTopicRequests(
      state.subscriptions?.user,
    );

  return unsubscribeRecipientFromTopicRequests?.[recipientId];
};

/**
 * Returns all unsubscribe recipient from topic requests state from the redux
 * store.
 *
 * @param state - Application state.
 *
 * @returns All unsubscribe recipient from topic requests state.
 */
export const getUnsubscribeRecipientFromTopicRequests = createSelector(
  (state: StoreState) =>
    userSubscriptionReducer.getUnsubscribeRecipientFromTopicRequests(
      state.subscriptions?.user,
    ),
  unsubscribeRecipientFromTopicRequests =>
    Object.entries(unsubscribeRecipientFromTopicRequests || {}).map(
      ([recipientId, unsubscribeRequestState]) => {
        return {
          ...unsubscribeRequestState,
          recipientId,
        };
      },
    ),
);
