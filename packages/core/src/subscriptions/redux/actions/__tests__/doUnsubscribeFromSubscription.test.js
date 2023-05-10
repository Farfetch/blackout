import { actionTypes } from '../..';
import { doUnsubscribeFromSubscription } from '../';
import { mockStore } from '../../../../../tests';
import reducer from '../../reducer';

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  let store;

  const id = 'c3e39b1f-69a8-47e3-ab7f-743ddd1278bc';
  const emailHash =
    '1ca9c02be7e27f42bdfdca1afef2618003bbdc7d08fe2e9b54d2ac5af8b37127';
  const packageList = ['newsletter', 'product_bundles'];

  beforeEach(jest.clearAllMocks);

  describe('doUnsubscribeFromSubscription() action creator', () => {
    const deleteSubscription = jest.fn();
    const action = doUnsubscribeFromSubscription(deleteSubscription);

    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it('Should create the correct actions when the unsubscribe from subscription request fails', async () => {
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
        await store.dispatch(action({ id, emailHash, packageList }));
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(deleteSubscription).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      }
    });

    it('Should create the correct actions when the unsubscribe from subscription request is successful', async () => {
      const expectedActions = [
        { type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST },
        {
          type: actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS,
        },
      ];
      const response = {};

      deleteSubscription.mockResolvedValueOnce(response);

      await store.dispatch(action({ id, emailHash, packageList }));

      expect(deleteSubscription).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
