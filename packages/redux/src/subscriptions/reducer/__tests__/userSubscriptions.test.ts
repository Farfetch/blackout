import * as actionTypes from '../../actionTypes';
import {
  mockRecipientId1TopicId1,
  mockRecipientId2,
  mockRecipientId2TopicId1,
  mockSubscriptionId,
  mockTopicId1,
  mockTopicId2,
  mockUserSubscriptionsState,
} from 'tests/__fixtures__/subscriptions';
import reducer, {
  getUnsubscribeRecipientFromTopicRequests,
  getUpdateSubscriptionsError,
  getUserSubscriptions,
  getUserSubscriptionsError,
  getUserSubscriptionsIsLoading,
  INITIAL_STATE,
} from '../userSubscriptions';
import type { BlackoutError, Subscription } from '@farfetch/blackout-client';
import type { SubscriptionsState } from '../../types';

const initialState: SubscriptionsState['user'] = INITIAL_STATE;
const randomAction = { type: 'this_is_a_random_action' };

describe('User Subscriptions redux reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, randomAction);

    expect(state).toStrictEqual(initialState);
  });

  describe('error() reducer', () => {
    it(`should handle ${actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).error,
      ).toBe(initialState.error);
    });

    it(`should handle ${actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).error,
      ).toBe(initialState.error);
    });

    it(`should handle ${actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      const expectedResult = 'This is an error';

      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: SubscriptionsState['user'] = {
        error: { message: 'foo', name: 'error', code: -1 },
        isLoading: false,
        result: [],
        unsubscribeRecipientFromTopicRequests: {},
        updateSubscriptionsError: undefined,
      };

      expect(reducer(state, randomAction).error).toEqual(state.error);
    });
  });

  describe('updateSubscriptionsError() reducer', () => {
    it(`should handle ${actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      const expectedResult = 'This is an error';

      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: expectedResult },
        }).updateSubscriptionsError,
      ).toBe(expectedResult);
    });

    it(`should handle ${actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).updateSubscriptionsError,
      ).toBe(initialState.updateSubscriptionsError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: SubscriptionsState['user'] = {
        ...mockUserSubscriptionsState,
        updateSubscriptionsError: { code: -1, name: 'foo', message: 'bar' },
      };

      expect(reducer(state, randomAction).updateSubscriptionsError).toEqual(
        state.updateSubscriptionsError,
      );
    });
  });

  describe('result() reducer', () => {
    it(`should handle ${actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS,
        }).result,
      ).toEqual(initialState.result);
    });

    it(`should handle ${actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS,
          payload: mockUserSubscriptionsState.result,
        }).result,
      ).toEqual(mockUserSubscriptionsState.result);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS,
        }).result,
      ).toEqual(initialState.result);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS} action type`, () => {
      // Case 1: Removing a channel from a topic that contains more than one channel.
      const action = {
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS,
        payload: {
          subscriptionId: mockSubscriptionId,
          topicId: mockTopicId1,
          recipientId: mockRecipientId1TopicId1,
        },
      };

      const subscription = mockUserSubscriptionsState.result[0] as Subscription;

      const topicIndex = subscription?.topics.findIndex(
        topic => topic.id === mockTopicId1,
      ) as number;

      const topic = subscription?.topics[topicIndex];

      const channelIndex = topic?.channels.findIndex(
        (channel: { id: string }) => channel.id === mockRecipientId1TopicId1,
      ) as number;

      const expectedResult = [...mockUserSubscriptionsState.result];

      const newSubscription = {
        ...subscription,
      };

      const newChannels = [...(topic?.channels || [])];
      newChannels.splice(channelIndex, 1);

      const newTopic = {
        ...newSubscription.topics[topicIndex],
        channels: newChannels,
      };

      newSubscription.topics = [...(newSubscription.topics || [])];
      // @ts-expect-error
      newSubscription.topics[topicIndex] = newTopic;

      expectedResult[0] = newSubscription;

      let state = reducer(mockUserSubscriptionsState, action);

      // Expecting a new state with only one channel removed from the first topic
      expect(state.result).toEqual(expectedResult);

      // Case 2: Removing all channels from a topic
      action.payload.recipientId = mockRecipientId2TopicId1;

      state = reducer(state, action);

      newSubscription.topics.splice(topicIndex, 1);

      // Expecting a new state with the first topic removed as it will not have any more channels after the
      // dispatched action
      expect(state.result).toEqual(expectedResult);

      // Case 3: Remove all channels from all topics
      action.payload.topicId = mockTopicId2;
      action.payload.recipientId = mockRecipientId2;

      state = reducer(state, action);

      // Expecting empty array because the previous action will remove the only channel from the only remaining topic in state
      expect(state.result).toEqual([]);

      // Case 4: Dispatching an action with a subscription id that does not exist in result state
      action.payload.subscriptionId = '11111';

      state = reducer(mockUserSubscriptionsState, action);

      // Expecting no changes to result state as the subscription id contained in the dispatched action does not exist in result state
      expect(state.result).toBe(mockUserSubscriptionsState.result);

      // Case 5: Dispatching an action with a topic id that does not exist in result state
      action.payload.subscriptionId = mockSubscriptionId;
      action.payload.topicId = '11111';

      state = reducer(mockUserSubscriptionsState, action);

      // Expecting no changes to result state as the topic id contained in the dispatched action does not exist in result state
      expect(state.result).toBe(mockUserSubscriptionsState.result);

      // Case 6: Dispatching an action with a recipient id that does not exist in result state
      action.payload.topicId = mockTopicId1;
      action.payload.recipientId = '11111';

      state = reducer(mockUserSubscriptionsState, action);

      // Expecting no changes to result state as the recipient id contained in the dispatched action does not exist in result state
      expect(state.result).toBe(mockUserSubscriptionsState.result);
    });

    it('should handle other actions by returning the previous state', () => {
      expect(reducer(mockUserSubscriptionsState, randomAction).result).toBe(
        mockUserSubscriptionsState.result,
      );
    });
  });

  describe('isLoading() reducer', () => {
    it(`should handle ${actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST,
          payload: {},
        }).isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: { code: -1 } },
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS,
          payload: {},
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: { code: -1 } },
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS,
          payload: {},
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE,
          payload: { error: { code: -1 } },
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS,
          payload: {},
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: SubscriptionsState['user'] = {
        isLoading: false,
        updateSubscriptionsError: undefined,
        unsubscribeRecipientFromTopicRequests: {},
        error: null,
        result: [],
      };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('subscriptions unsubscribeRecipientFromTopicRequests() reducer', () => {
    const stateWithoutUnsubscribeRecipientFromTopicRequests = {
      ...mockUserSubscriptionsState,
      unsubscribeRecipientFromTopicRequests: {},
    };

    it(`should add an entry to state when '${actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST}' is dispatched with a meta object containing 'trackRequestState' equals to true`, () => {
      const state = reducer(stateWithoutUnsubscribeRecipientFromTopicRequests, {
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
        payload: {
          subscriptionId: mockSubscriptionId,
          topicId: mockTopicId1,
          recipientId: mockRecipientId1TopicId1,
        },
        meta: {
          trackRequestState: true,
        },
      });

      expect(state.unsubscribeRecipientFromTopicRequests).toMatchObject({
        [mockRecipientId1TopicId1]:
          mockUserSubscriptionsState.unsubscribeRecipientFromTopicRequests[
            mockRecipientId1TopicId1
          ],
      });
    });

    it(`should _NOT_ add an entry to state when '${actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST}' is dispatched without a meta object containing 'trackRequestState' equals to true`, () => {
      const state = reducer(stateWithoutUnsubscribeRecipientFromTopicRequests, {
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
        payload: {
          subscriptionId: mockSubscriptionId,
          topicId: mockTopicId1,
          recipientId: mockRecipientId1TopicId1,
        },
      });

      expect(state.unsubscribeRecipientFromTopicRequests).toBe(
        stateWithoutUnsubscribeRecipientFromTopicRequests.unsubscribeRecipientFromTopicRequests,
      );
    });

    it(`should update request state when '${actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS}' is dispatched and a request for the recipientId exists on the store`, () => {
      const state = reducer(mockUserSubscriptionsState, {
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS,
        payload: {
          recipientId: mockRecipientId1TopicId1,
        },
      });

      expect(state.unsubscribeRecipientFromTopicRequests).toMatchObject({
        [mockRecipientId1TopicId1]: {
          ...mockUserSubscriptionsState.unsubscribeRecipientFromTopicRequests[
            mockRecipientId1TopicId1
          ],
          isFetching: false,
          success: true,
        },
      });
    });

    it(`should _NOT_ update request state when '${actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS}' is dispatched and a request for the recipientId does not exist on the store`, () => {
      const state = reducer(mockUserSubscriptionsState, {
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS,
        payload: {
          recipientId: 111111, // Dummy recipient id
        },
      });

      expect(state.unsubscribeRecipientFromTopicRequests).toBe(
        mockUserSubscriptionsState.unsubscribeRecipientFromTopicRequests,
      );
    });

    it(`should update request state when '${actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE}' is dispatched and a request for the recipientId exists on the store`, () => {
      const error = { code: -1, message: 'dummy error' };

      const newState = reducer(mockUserSubscriptionsState, {
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE,
        payload: {
          recipientId: mockRecipientId1TopicId1,
          error,
        },
      });

      expect(newState.unsubscribeRecipientFromTopicRequests).toMatchObject({
        [mockRecipientId1TopicId1]: {
          ...mockUserSubscriptionsState.unsubscribeRecipientFromTopicRequests[
            mockRecipientId1TopicId1
          ],
          isFetching: false,
          error,
          success: false,
        },
      });
    });

    it(`should _NOT_ update request state when '${actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE}' is dispatched and a request for the recipientId does not exist on the store`, () => {
      const error = { code: -1, message: 'dummy error' };

      const state = reducer(mockUserSubscriptionsState, {
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE,
        payload: {
          recipientId: 111111, // Dummy recipient id
          error,
        },
      });

      expect(state.unsubscribeRecipientFromTopicRequests).toBe(
        mockUserSubscriptionsState.unsubscribeRecipientFromTopicRequests,
      );
    });

    it(`should clear all unsubscribe requests state when '${actionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS}' is dispatched`, () => {
      const state = reducer(mockUserSubscriptionsState, {
        type: actionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS,
      });

      expect(state.unsubscribeRecipientFromTopicRequests).toStrictEqual({});
    });

    it(`should clear a specific unsubscribe request state when '${actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST}' is dispatched`, () => {
      const state = reducer(mockUserSubscriptionsState, {
        type: actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
        payload: { recipientId: mockRecipientId1TopicId1 },
      });

      const expectedState = {
        ...mockUserSubscriptionsState.unsubscribeRecipientFromTopicRequests,
      };

      delete expectedState[mockRecipientId1TopicId1];

      expect(state.unsubscribeRecipientFromTopicRequests).toStrictEqual(
        expectedState,
      );
    });

    it(`should _NOT_ change state when '${actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST}' is dispatched for a non existant recipient id`, () => {
      const state = reducer(mockUserSubscriptionsState, {
        type: actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
        payload: { recipientId: 111111 },
      });

      expect(state.unsubscribeRecipientFromTopicRequests).toBe(
        mockUserSubscriptionsState.unsubscribeRecipientFromTopicRequests,
      );
    });

    it('should handle other actions by returning the previous state', () => {
      expect(
        reducer(stateWithoutUnsubscribeRecipientFromTopicRequests, randomAction)
          .unsubscribeRecipientFromTopicRequests,
      ).toBe(
        stateWithoutUnsubscribeRecipientFromTopicRequests.unsubscribeRecipientFromTopicRequests,
      );
    });
  });

  describe('getSubscriptionsError() selector', () => {
    it('should return the error state', () => {
      const error = { message: 'This is an error', name: 'error', code: -1 };

      expect(getUserSubscriptionsError({ ...initialState, error })).toBe(error);
    });
  });

  describe('getSubscriptionsIsLoading() selector', () => {
    it('should return the loading state', () => {
      const isLoading = true;

      expect(
        getUserSubscriptionsIsLoading({
          ...initialState,
          isLoading,
        }),
      ).toBe(isLoading);
    });
  });

  describe('getSubscriptions() selector', () => {
    it('should return the result state', () => {
      const result: SubscriptionsState['user']['result'] = [];

      expect(getUserSubscriptions({ ...initialState, result })).toBe(result);
    });
  });

  describe('getUnsubscribeRecipientFromTopicRequests() selector', () => {
    it('should return unsubscribeRecipientFromTopicRequests state', () => {
      const unsubscribeRecipientFromTopicRequests: SubscriptionsState['user']['unsubscribeRecipientFromTopicRequests'] =
        {};

      expect(
        getUnsubscribeRecipientFromTopicRequests({
          ...initialState,
          unsubscribeRecipientFromTopicRequests,
        }),
      ).toBe(unsubscribeRecipientFromTopicRequests);
    });
  });

  describe('getUpdateSubscriptionsError() selector', () => {
    it('should return updateSubscriptionsError state', () => {
      const updateSubscriptionsError: BlackoutError = {
        name: 'error',
        message: 'foo',
        code: -1,
      };

      expect(
        getUpdateSubscriptionsError({
          ...initialState,
          updateSubscriptionsError,
        }),
      ).toBe(updateSubscriptionsError);
    });
  });
});
