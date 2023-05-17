import * as actionTypes from '../../actionTypes.js';
import { fetchUserReturns } from '../index.js';
import { find } from 'lodash-es';
import { getUserReturns } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer.js';
import {
  mockNormalizedUserReturnsResponse,
  mockUserReturnsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual<object>('@farfetch/blackout-client'),
  getUserReturns: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserReturns action creator', () => {
  let store = usersMockStore();
  const query = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user returns procedure fails', async () => {
    const expectedError = new Error('fetch user returns error');

    (getUserReturns as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(fetchUserReturns(userId, query)(store.dispatch)).rejects.toBe(
      expectedError,
    );
    expect(getUserReturns).toHaveBeenCalledTimes(1);
    expect(getUserReturns).toHaveBeenCalledWith(userId, query, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_RETURNS_REQUEST },
        {
          type: actionTypes.FETCH_USER_RETURNS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch user returns procedure is successful', async () => {
    (getUserReturns as jest.Mock).mockResolvedValueOnce(
      mockUserReturnsResponse,
    );

    await fetchUserReturns(userId, query)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserReturns).toHaveBeenCalledTimes(1);
    expect(getUserReturns).toHaveBeenCalledWith(userId, query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_RETURNS_REQUEST },
      {
        payload: mockNormalizedUserReturnsResponse,
        type: actionTypes.FETCH_USER_RETURNS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_RETURNS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch user returns success payload');
  });
});
