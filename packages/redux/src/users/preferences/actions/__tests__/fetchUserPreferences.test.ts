import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  code,
  expectedPreferencesNormalizedPayload,
  mockGetPreferencesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { fetchUserPreferences } from '../index.js';
import { find } from 'lodash-es';
import { getUserPreferences } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserPreferences: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('fetchUserPreferences() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user preferences procedure fails', async () => {
    const expectedError = new Error('get user preferences error');

    (getUserPreferences as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchUserPreferences(
          userId,
          code,
          expectedConfig,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserPreferences).toHaveBeenCalledTimes(1);
    expect(getUserPreferences).toHaveBeenCalledWith(
      userId,
      code,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_USER_PREFERENCES_REQUEST,
        },
        {
          type: actionTypes.FETCH_USER_PREFERENCES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user preferences procedure is successful', async () => {
    (getUserPreferences as jest.Mock).mockResolvedValueOnce(
      mockGetPreferencesResponse,
    );

    await fetchUserPreferences(userId, code, expectedConfig)(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserPreferences).toHaveBeenCalledTimes(1);
    expect(getUserPreferences).toHaveBeenCalledWith(
      userId,
      code,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_PREFERENCES_REQUEST },
      {
        payload: expectedPreferencesNormalizedPayload,
        type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_PREFERENCES_SUCCESS,
      }),
    ).toMatchSnapshot('get user preferences success payload');
  });
});
