import * as actionTypes from '../../actionTypes.js';
import {
  config,
  expectedConfig,
  mockGetUserClosetsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { fetchUserClosets } from '../index.js';
import { find } from 'lodash-es';
import { getUserClosets } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserClosets: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserClosets() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user closets procedure fails', async () => {
    const expectedError = new Error('fetch user closets error');

    (getUserClosets as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserClosets(userId, config)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserClosets).toHaveBeenCalledTimes(1);
    expect(getUserClosets).toHaveBeenCalledWith(userId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_CLOSETS_REQUEST },
        {
          type: actionTypes.FETCH_USER_CLOSETS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch user closets procedure is successful', async () => {
    (getUserClosets as jest.Mock).mockResolvedValueOnce(
      mockGetUserClosetsResponse,
    );

    await fetchUserClosets(userId, config)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserClosets).toHaveBeenCalledTimes(1);
    expect(getUserClosets).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_CLOSETS_REQUEST },
      {
        payload: mockGetUserClosetsResponse,
        type: actionTypes.FETCH_USER_CLOSETS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_CLOSETS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch user closets success payload');
  });
});
