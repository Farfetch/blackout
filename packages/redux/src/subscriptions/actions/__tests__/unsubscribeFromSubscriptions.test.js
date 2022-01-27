import { actionTypes } from '../..';
import { deleteSubscription } from '@farfetch/blackout-client/subscriptions';
import {
  mockEmailHash,
  mockSubscriptionId,
} from './../../../../../../tests/__fixtures__/subscriptions/deleteSubscription.fixtures';
import { mockStore } from '../../../../tests';
import { unsubscribeFromSubscription } from '../';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client/subscriptions', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/subscriptions'),
    deleteSubscription: jest.fn(),
  };
});

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  describe('unsubscribeAllSubscriptions() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions when the unsubscribe all subscriptions request fails', async () => {
      const expectedError = new Error('This is an error');
      const expectedActions = [
        { type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST },
        {
          type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE,
          payload: { error: expectedError },
        },
      ];

      deleteSubscription.mockRejectedValueOnce(expectedError);

      try {
        await store.dispatch(
          unsubscribeFromSubscription({
            id: mockSubscriptionId,
            emailHash: mockEmailHash,
          }),
        );
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(deleteSubscription).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      }
    });

    it('Should create the correct actions when the unsubscribe all subscriptions request is successful', async () => {
      const expectedActions = [
        { type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST },
        {
          type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS,
        },
      ];
      const response = {};

      deleteSubscription.mockResolvedValueOnce(response);

      await store.dispatch(
        unsubscribeFromSubscription({
          id: mockSubscriptionId,
          emailHash: mockEmailHash,
        }),
      );

      expect(deleteSubscription).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
