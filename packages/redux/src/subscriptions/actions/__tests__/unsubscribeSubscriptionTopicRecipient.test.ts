import * as actionTypes from '../../actionTypes';
import { deleteSubscriptionTopicRecipient } from '@farfetch/blackout-client';
import { mockStore } from '../../../../tests';
import {
  mockRecipientId1TopicId1 as recipientId,
  mockSubscriptionId as subscriptionId,
  mockTopicId1 as topicId,
} from 'tests/__fixtures__/subscriptions';
import { unsubscribeSubscriptionTopicRecipient } from '..';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
    deleteSubscriptionTopicRecipient: jest.fn(),
  };
});

const randomAction = { type: 'this_is_a_random_action' };
const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer(undefined, randomAction) }, state);

describe('Subscriptions redux actions', () => {
  let store: ReturnType<typeof subscriptionsMockStore>;

  const meta = { trackRequestState: true };

  beforeEach(jest.clearAllMocks);

  describe('unsubscribeRecipientFromTopic() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions when the unsubscribe subscription topic recipient request fails', async () => {
      const expectedError = new Error('This is an error');
      const expectedActions = [
        {
          type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_REQUEST,
          payload: {
            subscriptionId,
            topicId,
            recipientId,
          },
          meta,
        },
        {
          type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_FAILURE,
          payload: { recipientId, error: expectedError },
        },
      ];

      (deleteSubscriptionTopicRecipient as jest.Mock).mockRejectedValueOnce(
        expectedError,
      );

      await unsubscribeSubscriptionTopicRecipient(
        subscriptionId,
        topicId,
        recipientId,
        meta,
      )(store.dispatch).catch(error => {
        expect(error).toBe(expectedError);
        expect(deleteSubscriptionTopicRecipient).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      });
    });

    it('Should create the correct actions when the unsubscribe subscription topic recipient request is successful', async () => {
      const expectedActions = [
        {
          type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_REQUEST,
          payload: {
            subscriptionId,
            topicId,
            recipientId,
          },
          meta,
        },
        {
          type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_SUCCESS,
          payload: { recipientId },
        },
      ];
      const response = {};

      (deleteSubscriptionTopicRecipient as jest.Mock).mockResolvedValueOnce(
        response,
      );

      await unsubscribeSubscriptionTopicRecipient(
        subscriptionId,
        topicId,
        recipientId,
        meta,
      )(store.dispatch);

      expect(deleteSubscriptionTopicRecipient).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
