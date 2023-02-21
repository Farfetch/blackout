import * as actionTypes from '../../actionTypes';
import { deleteSubscription } from '@farfetch/blackout-client';
import { mockDeleteSubscription } from 'tests/__fixtures__/subscriptions';
import { mockStore } from '../../../../tests';
import { unsubscribeSubscription } from '..';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
    deleteSubscription: jest.fn(),
  };
});

const randomAction = { type: 'this_is_a_random_action' };
const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer(undefined, randomAction) }, state);

describe('Subscriptions redux actions', () => {
  let store: ReturnType<typeof subscriptionsMockStore>;

  beforeEach(jest.clearAllMocks);

  describe('unsubscribeSubscription() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions when the unsubscribe subscription request fails', async () => {
      const expectedError = new Error('This is an error');
      const expectedActions = [
        { type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_REQUEST },
        {
          type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_FAILURE,
          payload: { error: expectedError },
        },
      ];

      (deleteSubscription as jest.Mock).mockRejectedValueOnce(expectedError);

      await expect(
        async () =>
          await unsubscribeSubscription(mockDeleteSubscription.query)(
            store.dispatch,
          ),
      ).rejects.toThrow(expectedError);

      expect(deleteSubscription).toHaveBeenCalled();
      expect(store.getActions()).toEqual(
        expect.arrayContaining(expectedActions),
      );
    });

    it('Should create the correct actions when the unsubscribe subscription request is successful', async () => {
      const expectedActions = [
        { type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_REQUEST },
        {
          type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_SUCCESS,
        },
      ];
      const response = {};

      (deleteSubscription as jest.Mock).mockResolvedValueOnce(response);

      await unsubscribeSubscription(mockDeleteSubscription.query)(
        store.dispatch,
      );

      expect(deleteSubscription).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
