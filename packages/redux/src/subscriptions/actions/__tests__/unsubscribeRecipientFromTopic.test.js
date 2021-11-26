import { actionTypes } from '../..';
import { deleteRecipientFromTopic } from '@farfetch/blackout-client/subscriptions';
import { mockStore } from '../../../../tests';
import { unsubscribeRecipientFromTopic } from '..';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client/subscriptions', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/subscriptions'),
    deleteRecipientFromTopic: jest.fn(),
  };
});

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  let store;

  const subscriptionId = 'a0147156-b875-4353-a77d-b92ee3bb4625';
  const topicId = '8a3899e1-93dd-44d5-97c3-84cd24d12174';
  const recipientId = '5f8775c4-c7a0-4c91-b661-c8e70e0378fc';
  const meta = { trackRequestState: true };

  beforeEach(jest.clearAllMocks);

  describe('unsubscribeRecipientFromTopic() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions when the unsubscribe recipient from subscription topic request fails', async () => {
      const expectedError = new Error('This is an error');
      const expectedActions = [
        {
          type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
          payload: {
            subscriptionId,
            topicId,
            recipientId,
          },
          meta,
        },
        {
          type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE,
          payload: { recipientId, error: expectedError },
        },
      ];

      deleteRecipientFromTopic.mockRejectedValueOnce(expectedError);

      try {
        await store.dispatch(
          unsubscribeRecipientFromTopic(
            subscriptionId,
            topicId,
            recipientId,
            meta,
          ),
        );
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(deleteRecipientFromTopic).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      }
    });

    it('Should create the correct actions when the unsubscribe recipient from subscription topic request is successful', async () => {
      const expectedActions = [
        {
          type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
          payload: {
            subscriptionId,
            topicId,
            recipientId,
          },
          meta,
        },
        {
          type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS,
          payload: { recipientId },
        },
      ];
      const response = {};

      deleteRecipientFromTopic.mockResolvedValueOnce(response);

      await store.dispatch(
        unsubscribeRecipientFromTopic(
          subscriptionId,
          topicId,
          recipientId,
          meta,
        ),
      );

      expect(deleteRecipientFromTopic).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
