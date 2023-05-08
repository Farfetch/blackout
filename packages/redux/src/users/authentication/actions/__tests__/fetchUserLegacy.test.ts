import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedUserPayload,
  mockUsersResponse,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { getUserLegacy } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import fetchUserLegacy from '../fetchUserLegacy.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserLegacy: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchUserLegacy action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user legacy procedure fails', async () => {
    const expectedError = new Error('get user error');

    (getUserLegacy as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserLegacy()(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserLegacy).toHaveBeenCalledTimes(1);
    expect(getUserLegacy).toHaveBeenCalledWith(expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_REQUEST },
        {
          type: actionTypes.FETCH_USER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch user legacy procedure is successful', async () => {
    (getUserLegacy as jest.Mock).mockResolvedValueOnce(mockUsersResponse);

    await fetchUserLegacy()(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserLegacy).toHaveBeenCalledTimes(1);
    expect(getUserLegacy).toHaveBeenCalledWith(expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_REQUEST },
      {
        payload: expectedNormalizedUserPayload,
        type: actionTypes.FETCH_USER_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_SUCCESS,
      }),
    ).toMatchSnapshot('fetch user legacy success payload');
  });
});
