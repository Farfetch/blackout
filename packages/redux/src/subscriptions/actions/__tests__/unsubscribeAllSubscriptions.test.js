import { actionTypes } from '../..';
import { deleteSubscriptions } from '@farfetch/blackout-client/subscriptions';
import { mockStore } from '../../../../tests';
import { unsubscribeAllSubscriptions } from '../';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client/subscriptions', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/subscriptions'),
    deleteSubscriptions: jest.fn(),
  };
});

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  let store;

  const emailHash =
    '1ca9c02be7e27f42bdfdca1afef2618003bbdc7d08fe2e9b54d2ac5af8b37127';

  beforeEach(jest.clearAllMocks);

  describe('unsubscribeAllSubscriptions() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions when the unsubscribe all subscriptions request fails', async () => {
      const expectedError = new Error('This is an error');
      const expectedActions = [
        { type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST },
        {
          type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_FAILURE,
          payload: { error: expectedError },
        },
      ];

      deleteSubscriptions.mockRejectedValueOnce(expectedError);

      try {
        await store.dispatch(unsubscribeAllSubscriptions(emailHash));
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(deleteSubscriptions).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      }
    });

    it('Should create the correct actions when the unsubscribe all subscriptions request is successful', async () => {
      const expectedActions = [
        { type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST },
        {
          type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS,
        },
      ];
      const response = {};

      deleteSubscriptions.mockResolvedValueOnce(response);

      await store.dispatch(unsubscribeAllSubscriptions(emailHash));

      expect(deleteSubscriptions).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
