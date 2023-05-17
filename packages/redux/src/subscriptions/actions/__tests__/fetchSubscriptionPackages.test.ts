import * as actionTypes from '../../actionTypes.js';
import { fetchSubscriptionPackages } from '../index.js';
import { find } from 'lodash-es';
import { getSubscriptionPackages } from '@farfetch/blackout-client';
import { mockGetSubscriptionPackages } from 'tests/__fixtures__/subscriptions/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import reducer from '../../reducer/index.js';

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
    getSubscriptionPackages: jest.fn(),
  };
});

const randomAction = { type: 'this_is_a_random_action' };
const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer(undefined, randomAction) }, state);

describe('Subscriptions redux actions', () => {
  let store: ReturnType<typeof subscriptionsMockStore>;

  beforeEach(jest.clearAllMocks);

  describe('fetchSubscriptionPackages() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions for when the get subscription packages fails', async () => {
      const expectedError = new Error('get subscriptions error');

      (getSubscriptionPackages as jest.Mock).mockRejectedValueOnce(
        expectedError,
      );

      await expect(
        async () =>
          await fetchSubscriptionPackages(mockGetSubscriptionPackages.query)(
            store.dispatch,
          ),
      ).rejects.toThrow(expectedError);

      expect(getSubscriptionPackages).toHaveBeenCalledTimes(1);
      expect(getSubscriptionPackages).toHaveBeenCalledWith(
        mockGetSubscriptionPackages.query,
        undefined,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
            meta: { hash: 'id=Newsletter&id=BackInStock' },
          },
          {
            type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
            payload: { error: expectedError },
            meta: { hash: 'id=Newsletter&id=BackInStock' },
          },
        ]),
      );
    });

    it('Should create the correct actions for when the get subscription packages is successful', async () => {
      (getSubscriptionPackages as jest.Mock).mockResolvedValueOnce(
        mockGetSubscriptionPackages.response,
      );

      await fetchSubscriptionPackages(mockGetSubscriptionPackages.query)(
        store.dispatch,
      ).then(clientResult => {
        expect(clientResult).toBe(mockGetSubscriptionPackages.response);
      });

      const actionResults = store.getActions();

      expect(getSubscriptionPackages).toHaveBeenCalledTimes(1);
      expect(getSubscriptionPackages).toHaveBeenCalledWith(
        mockGetSubscriptionPackages.query,
        undefined,
      );
      expect(actionResults).toMatchObject([
        { type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST },
        {
          payload: expect.any(Object),
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
        }),
      ).toMatchSnapshot('Fetch subscription packages success payload');
    });
  });
});
