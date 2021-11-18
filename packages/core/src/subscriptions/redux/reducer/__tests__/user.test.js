import { actionTypes } from '../..';
import {
  mockRecipientId1TopicId1,
  mockRecipientId2,
  mockRecipientId2TopicId1,
  mockSubscriptionId,
  mockTopicId1,
  mockTopicId2,
  mockUserSubscriptionsState,
} from '../../__fixtures__/storeSubscriptionsState.fixtures';
import reducer, {
  getSubscriptions,
  getSubscriptionsError,
  getSubscriptionsIsLoading,
  getUnsubscribeRecipientFromTopicRequests,
  INITIAL_STATE,
} from '../user';

describe('User Subscriptions redux reducer', () => {
  it('should return the initial state', () => {
    const state = reducer();

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  describe('error() reducer', () => {
    it(`should handle ${actionTypes.PUT_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      const expectedResult = 'This is an error';

      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it(`should handle ${actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).error,
      ).toBe(INITIAL_STATE.error);
    });

    it(`should handle ${actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).error,
      ).toBe(INITIAL_STATE.error);
    });

    it(`should handle ${actionTypes.GET_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      const expectedResult = 'This is an error';

      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.GET_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toEqual(state.error);
    });
  });

  describe('result() reducer', () => {
    it(`should handle ${actionTypes.PUT_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_SUCCESS,
          payload: mockUserSubscriptionsState.result,
        }).result,
      ).toEqual(mockUserSubscriptionsState.result);
    });

    it(`should handle ${actionTypes.GET_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.GET_USER_SUBSCRIPTIONS_SUCCESS,
          payload: mockUserSubscriptionsState.result,
        }).result,
      ).toEqual(mockUserSubscriptionsState.result);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS,
        }).result,
      ).toEqual(INITIAL_STATE.result);
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

      const subscription = mockUserSubscriptionsState.result[0];

      const topicIndex = subscription.topics.findIndex(
        topic => topic.id === mockTopicId1,
      );

      const topic = subscription.topics[topicIndex];

      const channelIndex = topic.channels.findIndex(
        channel => channel.id === mockRecipientId1TopicId1,
      );

      const expectedResult = [...mockUserSubscriptionsState.result];

      const newSubscription = {
        ...subscription,
      };

      const newChannels = [...topic.channels];
      newChannels.splice(channelIndex, 1);

      const newTopic = {
        ...newSubscription.topics[topicIndex],
        channels: newChannels,
      };

      newSubscription.topics = [...newSubscription.topics];
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
      action.payload.subscriptionId = 11111;

      state = reducer(mockUserSubscriptionsState, action);

      // Expecting no changes to result state as the subscription id contained in the dispatched action does not exist in result state
      expect(state.result).toBe(mockUserSubscriptionsState.result);

      // Case 5: Dispatching an action with a topic id that does not exist in result state
      action.payload.subscriptionId = mockSubscriptionId;
      action.payload.topicId = 11111;

      state = reducer(mockUserSubscriptionsState, action);

      // Expecting no changes to result state as the topic id contained in the dispatched action does not exist in result state
      expect(state.result).toBe(mockUserSubscriptionsState.result);

      // Case 6: Dispatching an action with a recipient id that does not exist in result state
      action.payload.topicId = mockTopicId1;
      action.payload.recipientId = 11111;

      state = reducer(mockUserSubscriptionsState, action);

      // Expecting no changes to result state as the recipient id contained in the dispatched action does not exist in result state
      expect(state.result).toBe(mockUserSubscriptionsState.result);
    });

    it('should handle other actions by returning the previous state', () => {
      expect(reducer(mockUserSubscriptionsState).result).toBe(
        mockUserSubscriptionsState.result,
      );
    });
  });

  describe('isLoading() reducer', () => {
    it(`should handle ${actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST,
          payload: {},
        }).isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.GET_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.GET_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: { code: -1 } },
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.GET_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.GET_USER_SUBSCRIPTIONS_SUCCESS,
          payload: {},
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.PUT_USER_SUBSCRIPTIONS_FAILURE} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: { code: -1 } },
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.PUT_USER_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_SUCCESS,
          payload: {},
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_FAILURE} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_FAILURE,
          payload: { error: { code: -1 } },
        }).isLoading,
      ).toEqual(false);
    });

    it(`should handle ${actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS} action type`, () => {
      expect(
        reducer(mockUserSubscriptionsState, {
          type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS,
          payload: {},
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: false };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('unsubscribeRecipientFromTopicRequests() reducer', () => {
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
        reducer(stateWithoutUnsubscribeRecipientFromTopicRequests)
          .unsubscribeRecipientFromTopicRequests,
      ).toBe(
        stateWithoutUnsubscribeRecipientFromTopicRequests.unsubscribeRecipientFromTopicRequests,
      );
    });
  });

  describe('getSubscriptionsError() selector', () => {
    it('should return the error state', () => {
      const error = 'This is an error';

      expect(getSubscriptionsError({ error })).toBe(error);
    });
  });

  describe('getSubscriptionsIsLoading() selector', () => {
    it('should return the loading state', () => {
      const isLoading = true;

      expect(
        getSubscriptionsIsLoading({
          isLoading,
        }),
      ).toBe(isLoading);
    });
  });

  describe('getSubscriptions() selector', () => {
    it('should return the result state', () => {
      const result = [];

      expect(
        getSubscriptions({
          result,
        }),
      ).toBe(result);
    });
  });

  describe('getUnsubscribeRecipientFromTopicRequests() selector', () => {
    it('should return unsubscribeRecipientFromTopicRequests state', () => {
      const unsubscribeRecipientFromTopicRequests = {};

      expect(
        getUnsubscribeRecipientFromTopicRequests({
          unsubscribeRecipientFromTopicRequests,
        }),
      ).toBe(unsubscribeRecipientFromTopicRequests);
    });
  });
});
