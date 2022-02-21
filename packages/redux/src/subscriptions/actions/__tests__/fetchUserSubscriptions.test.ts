import { fetchUserSubscriptions } from '..';
import { getSubscriptions } from '@farfetch/blackout-client/subscriptions';
import { mockGetSubscriptions } from 'tests/__fixtures__/subscriptions/';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/subscriptions', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/subscriptions'),
    getSubscriptions: jest.fn(),
  };
});

const randomAction = { type: 'this_is_a_random_action' };
const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer(undefined, randomAction) }, state);

describe('Subscriptions redux actions', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  describe('fetchUserSubscriptions() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions for when the get subscription fails', async () => {
      const expectedError = new Error('get subscriptions error');

      getSubscriptions.mockRejectedValueOnce(expectedError);
      expect.assertions(4);

      try {
        await store.dispatch(
          fetchUserSubscriptions(mockGetSubscriptions.query),
        );
      } catch (error) {
        expect(error).toBe(expectedError);
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
      }
    });

    it('Should create the correct actions for when the get subscriptions is successful', async () => {
      getSubscriptions.mockResolvedValueOnce(mockGetSubscriptions.response);

      await store
        .dispatch(fetchUserSubscriptions(mockGetSubscriptions.query))
        .then(clientResult => {
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
