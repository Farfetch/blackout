import * as actionTypes from '../../actionTypes.js';
import { fetchUserExternalLogins } from '../index.js';
import { find } from 'lodash-es';
import { getUserExternalLogins } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockFetchUserExternalLoginsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserExternalLogins: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchUserExternalLogins action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user external logins procedure fails', async () => {
    const expectedError = new Error('get user external logins error');

    (getUserExternalLogins as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserExternalLogins(userId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserExternalLogins).toHaveBeenCalledTimes(1);
    expect(getUserExternalLogins).toHaveBeenCalledWith(userId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_REQUEST },
        {
          type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user external logins procedure is successful', async () => {
    (getUserExternalLogins as jest.Mock).mockResolvedValueOnce(
      mockFetchUserExternalLoginsResponse,
    );

    await fetchUserExternalLogins(userId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserExternalLogins).toHaveBeenCalledTimes(1);
    expect(getUserExternalLogins).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_REQUEST },
      {
        payload: mockFetchUserExternalLoginsResponse,
        type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_SUCCESS,
      }),
    ).toMatchSnapshot('get user external logins success payload');
  });
});
