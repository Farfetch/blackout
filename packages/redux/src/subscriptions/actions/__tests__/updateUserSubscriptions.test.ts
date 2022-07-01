import * as actionTypes from '../../actionTypes';
import { mockPutSubscriptions } from 'tests/__fixtures__/subscriptions';
import { mockStore } from '../../../../tests';
import { putSubscriptions } from '@farfetch/blackout-client';
import { updateUserSubscriptions } from '..';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-client'),
    putSubscriptions: jest.fn(),
  };
});

const randomAction = { type: 'this_is_a_random_action' };
const subscriptionsMockStore = (state = {}) =>
  mockStore({ subscriptions: reducer(undefined, randomAction) }, state);

describe('Subscriptions redux actions', () => {
  let store: ReturnType<typeof subscriptionsMockStore>;

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

      (putSubscriptions as jest.Mock).mockRejectedValueOnce(expectedError);

      // @ts-expect-error
      await updateUserSubscriptions()(store.dispatch).catch(error => {
        expect(error).toBe(expectedError);
        expect(putSubscriptions).toBeCalled();
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions),
        );
      });
    });

    it("Should create the correct actions when the user subscriptions' put request is successful", async () => {
      await updateUserSubscriptions(mockPutSubscriptions.data)(store.dispatch);

      const actionResults = store.getActions();

      expect(putSubscriptions).toHaveBeenCalledTimes(1);
      expect(putSubscriptions).toHaveBeenCalledWith(
        mockPutSubscriptions.data,
        undefined,
      );
      expect(actionResults).toMatchObject([
        { type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST },
        {
          type: actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS,
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
