import * as actionTypes from '../../actionTypes.js';
import { fetchUserSubscriptions } from '../index.js';
import { find } from 'lodash-es';
import { getSubscriptions } from '@farfetch/blackout-client';
import { mockGetSubscriptions } from 'tests/__fixtures__/subscriptions/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import reducer from '../../reducer/index.js';

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
    getSubscriptions: jest.fn(),
  };
});

const randomAction = { type: 'this_is_a_random_action' };
const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer(undefined, randomAction) }, state);

describe('Subscriptions redux actions', () => {
  let store: ReturnType<typeof subscriptionsMockStore>;

  beforeEach(jest.clearAllMocks);

  describe('fetchUserSubscriptions() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions for when the get subscription fails', async () => {
      const expectedError = new Error('get subscriptions error');

      (getSubscriptions as jest.Mock).mockRejectedValueOnce(expectedError);

      await expect(
        async () =>
          await fetchUserSubscriptions(mockGetSubscriptions.query)(
            store.dispatch,
          ),
      ).rejects.toThrow(expectedError);

      expect(getSubscriptions).toHaveBeenCalledTimes(1);
      expect(getSubscriptions).toHaveBeenCalledWith(
        mockGetSubscriptions.query,
        undefined,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST },
          {
            type: actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });

    it('Should create the correct actions for when the get subscriptions is successful', async () => {
      (getSubscriptions as jest.Mock).mockResolvedValueOnce(
        mockGetSubscriptions.response,
      );

      await fetchUserSubscriptions(mockGetSubscriptions.query)(
        store.dispatch,
      ).then(clientResult => {
        expect(clientResult).toBe(mockGetSubscriptions.response);
      });

      const actionResults = store.getActions();

      expect(getSubscriptions).toHaveBeenCalledTimes(1);
      expect(getSubscriptions).toHaveBeenCalledWith(
        mockGetSubscriptions.query,
        undefined,
      );
      expect(actionResults).toMatchObject([
        { type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST },
        {
          payload: expect.any(Object),
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS,
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS,
        }),
      ).toMatchSnapshot('Fetch subscriptions success payload');
    });
  });
});
