import * as actionTypes from '../actionTypes';
import * as authenticationActionTypes from '../../users/authentication/actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { ReducerSwitch } from '../../types';
import type {
  Subscription,
  SubscriptionTopic,
} from '@farfetch/blackout-client';
import type { SubscriptionsState } from '../types';

type UserSubscriptionsState = SubscriptionsState['user'];

export const INITIAL_STATE: UserSubscriptionsState = {
  error: null,
  isLoading: false,
  result: null,
  unsubscribeRecipientFromTopicRequests: {},
  updateSubscriptionsError: null,
};

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): UserSubscriptionsState['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const updateSubscriptionsError = (
  state = INITIAL_STATE.updateSubscriptionsError,
  action: AnyAction,
): UserSubscriptionsState['updateSubscriptionsError'] => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE:
      return action.payload.error;
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST:
      return INITIAL_STATE.updateSubscriptionsError;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): UserSubscriptionsState['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST:
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST:
      return true;
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS:
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE:
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS:
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE:
      return false;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): UserSubscriptionsState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS:
      return action.payload;
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS:
      return INITIAL_STATE.result;
    case actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS: {
      const { subscriptionId, topicId, recipientId } = action.payload;

      if (!state) {
        return state;
      }

      const subscription = state.find(
        subscription => subscription.id === subscriptionId,
      );

      if (subscription) {
        const topic = subscription.topics.find(topic => topic.id === topicId);

        if (topic) {
          const recipient = topic.channels?.find(
            channel => channel.id === recipientId,
          );

          if (recipient) {
            // New topic channels without old recipient id
            const newTopicChannels = [
              ...topic.channels.filter(channel => channel.id !== recipientId),
            ];

            // update topic list
            const newTopics: SubscriptionTopic[] = [];
            if (!newTopicChannels.length) {
              // if result channel list are empty, then remove topic entry
              newTopics.push(
                ...subscription.topics.filter(topic => topic.id !== topicId),
              );
            } else {
              // replace old topic list replacing old topic list with new one
              newTopics.push(
                ...subscription.topics.map(topic => {
                  return {
                    ...topic,
                    channels:
                      topic.id === topicId ? newTopicChannels : topic.channels,
                  };
                }),
              );
            }

            const newState: Subscription[] = [];
            if (!newTopics.length) {
              // if result channel list are empty, then remove topic entry
              newState.push(
                ...state.filter(
                  subscription => subscription.id !== subscriptionId,
                ),
              );
            } else {
              // replace old topic list replacing old topic list with new one
              newState.push(
                ...state.map(subscription => {
                  return {
                    ...subscription,
                    topics:
                      subscription.id === subscriptionId
                        ? newTopics
                        : subscription.topics,
                  };
                }),
              );
            }

            return newState;
          }
        }
      }
      return state;
    }
    default:
      return state;
  }
};

const unsubscribeRecipientFromTopicRequests = (
  state = INITIAL_STATE.unsubscribeRecipientFromTopicRequests,
  action: AnyAction,
): UserSubscriptionsState['unsubscribeRecipientFromTopicRequests'] => {
  switch (action.type) {
    case actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST: {
      const trackRequestState = action.meta?.trackRequestState;

      if (trackRequestState) {
        const { subscriptionId, topicId, recipientId } = action.payload;

        return {
          ...state,
          [recipientId]: {
            subscriptionId,
            topicId,
            isFetching: true,
            error: undefined,
            success: undefined,
          },
        };
      }

      return state;
    }

    case actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS: {
      const recipientId = action.payload?.recipientId;
      const requestState = state[recipientId];

      if (requestState) {
        return {
          ...state,
          [recipientId]: {
            ...requestState,
            isFetching: false,
            success: true,
          },
        };
      }

      return state;
    }

    case actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE: {
      const error = action.payload?.error;
      const recipientId = action.payload?.recipientId;
      const requestState = state[recipientId];

      if (requestState) {
        return {
          ...state,
          [recipientId]: {
            ...requestState,
            isFetching: false,
            success: false,
            error,
          },
        };
      }

      return state;
    }

    case actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST: {
      const { recipientId } = action.payload;

      if (recipientId in state) {
        const newState = {
          ...state,
        };

        delete newState[recipientId];

        return newState;
      }

      return state;
    }

    case actionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS: {
      return INITIAL_STATE.unsubscribeRecipientFromTopicRequests;
    }

    default:
      return state;
  }
};

export const getUserSubscriptionsError = (
  state: UserSubscriptionsState = INITIAL_STATE,
): UserSubscriptionsState['error'] => state.error;
export const getUserSubscriptionsIsLoading = (
  state: UserSubscriptionsState = INITIAL_STATE,
): UserSubscriptionsState['isLoading'] => state.isLoading;
export const getUserSubscriptions = (
  state: UserSubscriptionsState = INITIAL_STATE,
): UserSubscriptionsState['result'] => state.result;
export const getUnsubscribeRecipientFromTopicRequests = (
  state: UserSubscriptionsState = INITIAL_STATE,
): UserSubscriptionsState['unsubscribeRecipientFromTopicRequests'] =>
  state.unsubscribeRecipientFromTopicRequests;
export const getUpdateSubscriptionsError = (
  state: UserSubscriptionsState = INITIAL_STATE,
): UserSubscriptionsState['updateSubscriptionsError'] =>
  state.updateSubscriptionsError;

const reducer = combineReducers({
  error,
  isLoading,
  result,
  unsubscribeRecipientFromTopicRequests,
  updateSubscriptionsError,
});

/**
 * Reducer for user subscription state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const userSubscriptionsReducer: ReducerSwitch<
  UserSubscriptionsState,
  AnyAction
> = (state = INITIAL_STATE, action): UserSubscriptionsState => {
  switch (action.type) {
    case actionTypes.RESET_SUBSCRIPTIONS:
    case authenticationActionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return reducer(state, action);
  }
};

export default userSubscriptionsReducer;
