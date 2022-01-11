import { actionTypes } from '../..';
import { fetchSubscriptionPackages } from '..';
import { getSubscriptionPackages } from '@farfetch/blackout-client/subscriptions';
import {
  mockQuery,
  mockResponse,
} from 'tests/__fixtures__/subscriptions/getSubscriptionPackages.fixtures';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client/subscriptions', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/subscriptions'),
    getSubscriptionPackages: jest.fn(),
  };
});

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  describe('fetchSubscriptionPackages() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions for when the get subscription packages fails', async () => {
      const expectedError = new Error('get subscriptions error');

      getSubscriptionPackages.mockRejectedValueOnce(expectedError);
      expect.assertions(4);

      try {
        await store.dispatch(fetchSubscriptionPackages(mockQuery));
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(getSubscriptionPackages).toHaveBeenCalledTimes(1);
        expect(getSubscriptionPackages).toHaveBeenCalledWith(
          mockQuery,
          undefined,
        );
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
            },
            {
              type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
              payload: { error: expectedError },
            },
          ]),
        );
      }
    });

    it('Should create the correct actions for when the get subscription packages is successful', async () => {
      getSubscriptionPackages.mockResolvedValueOnce(mockResponse);

      await store
        .dispatch(fetchSubscriptionPackages(mockQuery))
        .then(clientResult => {
          expect(clientResult).toBe(mockResponse);
        });

      const actionResults = store.getActions();

      expect(getSubscriptionPackages).toHaveBeenCalledTimes(1);
      expect(getSubscriptionPackages).toHaveBeenCalledWith(
        mockQuery,
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
