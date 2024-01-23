import * as actionTypes from '../../actionTypes.js';
import { fetchUserSubscriptionsVNext } from '../index.js';
import { find } from 'lodash-es';
import { getSubscriptionsVNext } from '@farfetch/blackout-client';
import { mockGetSubscriptionsVNext } from 'tests/__fixtures__/subscriptions/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import reducer from '../../reducer/index.js';

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
    getSubscriptionsVNext: jest.fn(),
  };
});

const randomAction = { type: 'this_is_a_random_action' };
const subscriptionsMockStore = (state = {}) =>
  mockStore({ getSubscriptionsVNext: reducer(undefined, randomAction) }, state);

describe('Subscriptions redux actions', () => {
  let store: ReturnType<typeof subscriptionsMockStore>;

  beforeEach(jest.clearAllMocks);

  describe('fetchUserSubscriptionsVNext() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions for when the get subscription fails', async () => {
      const expectedError = new Error('get subscriptions error');

      (getSubscriptionsVNext as jest.Mock).mockRejectedValueOnce(expectedError);

      await expect(
        async () =>
          await fetchUserSubscriptionsVNext(mockGetSubscriptionsVNext.query)(
            store.dispatch,
          ),
      ).rejects.toThrow(expectedError);

      expect(getSubscriptionsVNext).toHaveBeenCalledTimes(1);
      expect(getSubscriptionsVNext).toHaveBeenCalledWith(
        mockGetSubscriptionsVNext.query,
        undefined,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST_VNEXT },
          {
            type: actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });

    it('Should create the correct actions for when the get subscriptions is successful', async () => {
      (getSubscriptionsVNext as jest.Mock).mockResolvedValueOnce(
        mockGetSubscriptionsVNext.response,
      );

      await fetchUserSubscriptionsVNext(mockGetSubscriptionsVNext.query)(
        store.dispatch,
      ).then(clientResult => {
        expect(clientResult).toBe(mockGetSubscriptionsVNext.response);
      });

      const actionResults = store.getActions();

      expect(getSubscriptionsVNext).toHaveBeenCalledTimes(1);
      expect(getSubscriptionsVNext).toHaveBeenCalledWith(
        mockGetSubscriptionsVNext.query,
        undefined,
      );
      expect(actionResults).toMatchObject([
        { type: actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST_VNEXT },
        {
          payload: expect.any(Object),
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS_VNEXT,
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS_VNEXT,
        }),
      ).toMatchSnapshot('Fetch subscriptions success payload');
    });
  });
});
