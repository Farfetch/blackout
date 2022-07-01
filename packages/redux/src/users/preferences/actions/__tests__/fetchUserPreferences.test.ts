import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  expectedPreferencesNormalizedPayload,
  mockGetPreferencesResponse,
} from 'tests/__fixtures__/users';
import { fetchUserPreferences } from '..';
import { getUserPreferences } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserPreferences: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();
const normalizeSpy = jest.spyOn(normalizr, 'normalize');

describe('fetchUserPreferences action creator', () => {
  const userId = 232;
  const mockCode = 'test';

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get preferences procedure fails', async () => {
    const expectedError = new Error('get preferences error');

    (getUserPreferences as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchUserPreferences(userId, mockCode, expectedConfig),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserPreferences).toHaveBeenCalledTimes(1);
      expect(getUserPreferences).toHaveBeenCalledWith(
        userId,
        mockCode,
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
    }
  });

  it('should create the correct actions for when the get preferences procedure is successful', async () => {
    (getUserPreferences as jest.Mock).mockResolvedValueOnce(
      mockGetPreferencesResponse,
    );

    await store.dispatch(
      fetchUserPreferences(userId, mockCode, expectedConfig),
    );

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserPreferences).toHaveBeenCalledTimes(1);
    expect(getUserPreferences).toHaveBeenCalledWith(
      userId,
      mockCode,
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
    ).toMatchSnapshot('get preferences success payload');
  });
});
