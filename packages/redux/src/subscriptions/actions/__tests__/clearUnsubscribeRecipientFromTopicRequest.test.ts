import { actionTypes } from '../..';
import { mockStore } from '../../../../tests';
import clearUnsubscribeRecipientFromTopicRequest from '../clearUnsubscribeRecipientFromTopicRequest';

let store;

describe('reset()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action', () => {
    const mockRecipientId = 'foo';

    store.dispatch(clearUnsubscribeRecipientFromTopicRequest(mockRecipientId));

    expect(store.getActions()).toEqual([
      {
        payload: { recipientId: mockRecipientId },
        type: actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
      },
    ]);
  });
});
