import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
  result: null,
  unsubscribeRecipientFromTopicRequests: {},
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE:
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST:
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST:
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
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
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS:
    case actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS:
      return action.payload;
    case actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS:
      return INITIAL_STATE.result;
    case actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS: {
      const { subscriptionId, topicId, recipientId } = action.payload;

      const subscriptionIndex = state?.findIndex(
        subscription => subscription.id === subscriptionId,
      );

      if (subscriptionIndex > -1) {
        const subscription = state[subscriptionIndex];

        const topicIndex = subscription.topics?.findIndex(
          topic => topic.id === topicId,
        );

        if (topicIndex > -1) {
          const topic = subscription.topics[topicIndex];

          const recipientIndex = topic.channels?.findIndex(
            channel => channel.id === recipientId,
          );

          if (recipientIndex > -1) {
            // Found recipient in subscription.
            // Create a new state that does not include this recipientId

            const newTopicChannels = [...topic.channels];
            newTopicChannels.splice(recipientIndex, 1);

            const newTopics = [...subscription.topics];

            // If there are no channels, remove the topic altogether
            if (!newTopicChannels.length) {
              newTopics.splice(topicIndex, 1);
            } else {
              newTopics[topicIndex] = {
                ...newTopics[topicIndex],
                channels: newTopicChannels,
              };
            }

            const newState = [...state];

            // If there are no topics, remove the subscription altogether
            if (!newTopics.length) {
              newState.splice(subscriptionIndex, 1);
            } else {
              newState[subscriptionIndex] = {
                ...newState[subscriptionIndex],
                topics: newTopics,
              };
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
  /* istanbul ignore next */ action = {},
) => {
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

export const getSubscriptionsError = state => state.error;
export const getSubscriptionsIsLoading = state => state.isLoading;
export const getSubscriptions = state => state.result;
export const getUnsubscribeRecipientFromTopicRequests = state =>
  state.unsubscribeRecipientFromTopicRequests;

export default combineReducers({
  error,
  isLoading,
  result,
  unsubscribeRecipientFromTopicRequests,
});
