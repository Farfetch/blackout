import { doGetUserReturns } from '../';
import { mockGetUserReturnsResponse } from '../../__fixtures__/userReturns.fixtures';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

describe('doGetUserReturns action creator', () => {
  let store;
  const getUserReturns = jest.fn();
  const action = doGetUserReturns(getUserReturns);
  const userId = 123456789;
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get user returns procedure fails', async () => {
    const expectedError = new Error('get user returns error');

    getUserReturns.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserReturns).toHaveBeenCalledTimes(1);
      expect(getUserReturns).toHaveBeenCalledWith(userId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_USER_RETURNS_REQUEST },
          {
            type: actionTypes.GET_USER_RETURNS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get user returns procedure is successful', async () => {
    getUserReturns.mockResolvedValueOnce(mockGetUserReturnsResponse);

    await store.dispatch(action(userId));

    const actionResults = store.getActions();

    expect(getUserReturns).toHaveBeenCalledTimes(1);
    expect(getUserReturns).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_USER_RETURNS_REQUEST },
      {
        payload: mockGetUserReturnsResponse,
        type: actionTypes.GET_USER_RETURNS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_USER_RETURNS_SUCCESS,
      }),
    ).toMatchSnapshot('get guest user success payload');
  });
});
