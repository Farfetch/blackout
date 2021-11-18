import { actionTypes } from '../..';
import { doGetUserSubscriptions } from '../';
import { mockStore } from '../../../../../tests';
import { userSubscription } from '../__mocks__/userSubscription';
import find from 'lodash/find';
import reducer from '../../reducer';

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  const expectedConfig = undefined;
  let store;

  beforeEach(jest.clearAllMocks);

  describe('doGetUserSubscriptions() action creator', () => {
    const getSubscriptions = jest.fn();
    const action = doGetUserSubscriptions(getSubscriptions);
    const query = {
      customerId: 'user@email.com',
      packageId: ['Newsletter', 'BackInStock'],
    };

    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions for when the get subscription fails', async () => {
      const expectedError = new Error('get subscriptions error');

      getSubscriptions.mockRejectedValueOnce(expectedError);
      expect.assertions(4);

      try {
        await store.dispatch(action(query));
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(getSubscriptions).toHaveBeenCalledTimes(1);
        expect(getSubscriptions).toHaveBeenCalledWith(query, expectedConfig);
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { type: actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST },
            {
              type: actionTypes.GET_USER_SUBSCRIPTIONS_FAILURE,
              payload: { error: expectedError },
            },
          ]),
        );
      }
    });

    it('Should create the correct actions for when the get subscriptions is successful', async () => {
      getSubscriptions.mockResolvedValueOnce(userSubscription);

      await store.dispatch(action(query));

      const actionResults = store.getActions();

      expect(getSubscriptions).toHaveBeenCalledTimes(1);
      expect(getSubscriptions).toHaveBeenCalledWith(query, expectedConfig);
      expect(actionResults).toMatchObject([
        { type: actionTypes.GET_USER_SUBSCRIPTIONS_REQUEST },
        {
          payload: userSubscription,
          type: actionTypes.GET_USER_SUBSCRIPTIONS_SUCCESS,
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.GET_USER_SUBSCRIPTIONS_SUCCESS,
        }),
      ).toMatchSnapshot('Get subscriptions success payload');
    });
  });
});
