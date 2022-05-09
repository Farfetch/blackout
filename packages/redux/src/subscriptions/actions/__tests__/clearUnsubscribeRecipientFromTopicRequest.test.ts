import { mockStore } from '../../../../tests';
import clearUnsubscribeRecipientFromTopicRequest from '../clearUnsubscribeRecipientFromTopicRequest';
import reducer, { actionTypes } from '../..';

let store: ReturnType<typeof mockStore>;
const randomAction = { type: 'this_is_a_random_action' };
describe('reset()', () => {
  beforeEach(() => {
    store = mockStore({ subscriptions: reducer(undefined, randomAction) }, {});
  });

  it('should dispatch the correct action', () => {
    const mockRecipientId = 'foo';

    clearUnsubscribeRecipientFromTopicRequest(mockRecipientId)(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        payload: { recipientId: mockRecipientId },
        type: actionTypes.CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
      },
    ]);
  });
});
