import { actionTypes } from '../..';
import {
  mockData,
  mockResponse,
} from 'tests/__fixtures__/subscriptions/putSubscriptions.fixtures';
import { mockStore } from '../../../../tests';
import { putSubscriptions } from '@farfetch/blackout-client/subscriptions';
import { updateUserSubscriptions } from '..';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client/subscriptions', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client/subscriptions'),
    putSubscriptions: jest.fn(),
  };
});

const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer() }, state);

describe('Subscriptions redux actions', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  describe('updateUserSubscriptions() action creator', () => {
    beforeEach(() => {
      store = subscriptionsMockStore();
    });

    it("Should create the correct actions when the user subscriptions's put request fails", async () => {
      const expectedError = new Error('This is an error');
      const expectedActions = [
        { type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST },
        {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE,
          payload: { error: expectedError },
        },
      ];

      putSubscriptions.mockRejectedValueOnce(expectedError);

      try {
        await store.dispatch(updateUserSubscriptions());
      } catch (error) {
        expect(error).toBe(expectedError);
        expect(putSubscriptions).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      }
    });

    it("Should create the correct actions when the user subscriptions' put request is successful", async () => {
      putSubscriptions.mockResolvedValueOnce(mockResponse);

      await store
        .dispatch(updateUserSubscriptions(mockData))
        .then(clientResult => {
          expect(clientResult).toBe(mockResponse);
        });

      const actionResults = store.getActions();

      expect(putSubscriptions).toHaveBeenCalledTimes(1);
      expect(putSubscriptions).toHaveBeenCalledWith(mockData, undefined);
      expect(actionResults).toMatchObject([
        { type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST },
        {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS,
          payload: expect.any(Object),
        },
      ]);
      expect(
        find(actionResults, {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS,
        }),
      ).toMatchSnapshot('Update subscriptions success payload');
    });
  });
});
