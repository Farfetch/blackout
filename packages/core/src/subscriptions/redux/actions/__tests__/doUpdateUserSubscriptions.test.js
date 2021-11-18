import { actionTypes } from '../..';
import { doUpdateUserSubscriptions } from '../';
import { mockStore } from '../../../../../tests';
import reducer from '../../reducer';

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  const mockState = {
    subscriptions: {
      error: null,
      result: null,
      isLoading: false,
    },
  };

  describe('doUpdateUserSubscriptions() action creator', () => {
    const putSubscriptions = jest.fn();
    const action = doUpdateUserSubscriptions(putSubscriptions);

    beforeEach(() => {
      store = subscriptionsMockStore(mockState);
    });

    it("Should create the correct actions when the user subscriptions's put request fails", async () => {
      const expectedError = new Error('This is an error');
      const expectedActions = [
        { type: actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST },
        {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: expectedError },
        },
      ];

      putSubscriptions.mockRejectedValueOnce(expectedError);

      try {
        await store.dispatch(action());
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(putSubscriptions).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      }
    });

    it("Should create the correct actions when the user subscriptions's put request is successful", async () => {
      const expectedActions = [
        { type: actionTypes.PUT_USER_SUBSCRIPTIONS_REQUEST },
        {
          type: actionTypes.PUT_USER_SUBSCRIPTIONS_SUCCESS,
          payload: {},
        },
      ];
      const response = {};

      putSubscriptions.mockResolvedValueOnce(response);

      await store.dispatch(action());

      expect(putSubscriptions).toBeCalled();
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
