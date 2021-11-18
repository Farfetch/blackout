import { actionTypes } from '../..';
import { doGetSubscriptionPackages } from '../';
import {
  expectedNormalizedPayload,
  subscriptionPackagesResponse,
} from '../__mocks__/subscriptionPackages';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer from '../../reducer';

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  const expectedConfig = undefined;
  let store;

  beforeEach(jest.clearAllMocks);

  describe('doGetSubscriptionPackages() action creator', () => {
    const getSubscriptionPackages = jest.fn();
    const action = doGetSubscriptionPackages(getSubscriptionPackages);
    const query = { id: ['Newsletter'] };

    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions for when the get subscription packages fails', async () => {
      const expectedError = new Error('get subscriptions error');

      getSubscriptionPackages.mockRejectedValueOnce(expectedError);
      expect.assertions(4);

      try {
        await store.dispatch(action(query));
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(getSubscriptionPackages).toHaveBeenCalledTimes(1);
        expect(getSubscriptionPackages).toHaveBeenCalledWith(
          query,
          expectedConfig,
        );
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { type: actionTypes.GET_SUBSCRIPTION_PACKAGES_REQUEST },
            {
              type: actionTypes.GET_SUBSCRIPTION_PACKAGES_FAILURE,
              payload: { error: expectedError },
            },
          ]),
        );
      }
    });

    it('Should create the correct actions for when the get subscription packages is successful', async () => {
      getSubscriptionPackages.mockResolvedValueOnce(
        subscriptionPackagesResponse,
      );

      await store.dispatch(action(query));

      const actionResults = store.getActions();

      expect(getSubscriptionPackages).toHaveBeenCalledTimes(1);
      expect(getSubscriptionPackages).toHaveBeenCalledWith(
        query,
        expectedConfig,
      );
      expect(actionResults).toMatchObject([
        { type: actionTypes.GET_SUBSCRIPTION_PACKAGES_REQUEST },
        {
          payload: expectedNormalizedPayload,
          type: actionTypes.GET_SUBSCRIPTION_PACKAGES_SUCCESS,
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.GET_SUBSCRIPTION_PACKAGES_SUCCESS,
        }),
      ).toMatchSnapshot('Get subscription packages success payload');
    });
  });
});
