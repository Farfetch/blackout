import * as userSubscriptionReducer from '../reducer/userSubscriptions';
import { createSelector } from 'reselect';
import defaultTo from 'lodash/defaultTo';
import type { StoreState } from '../../types';
import type {
  SubscriptionsState,
  UnsubscribeRecipientFromTopicType,
} from './../types';
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
export const getUserSubscribedTopicsForPlatform: (
  state: StoreState,
  platform: string,
) => SubscriptionTopic[] = createSelector(
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
export const getUserSubscribedTopicsForAddress: (
  state: StoreState,
  address: string,
) => SubscriptionTopic[] = createSelector(
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
export const areUserSubscriptionsLoading = (state: StoreState) =>
  userSubscriptionReducer.getUserSubscriptionsIsLoading(
    state.subscriptions?.user,
  );

/**
 * Retrieves if user subscriptions have been fetched.
 *
 * Will return true if a fetch request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areUserSubscriptionsFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areUserSubscriptionsFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of the subscription packages.
 */
export const areUserSubscriptionsFetched = (state: StoreState) =>
  (!!getUserSubscriptions(state) || !!getUserSubscriptionsError(state)) &&
  !areUserSubscriptionsLoading(state);

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
export const getUnsubscribeRecipientFromTopicRequests: (
  state: StoreState,
) => (UnsubscribeRecipientFromTopicType & { recipientId: string })[] =
  createSelector(
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
