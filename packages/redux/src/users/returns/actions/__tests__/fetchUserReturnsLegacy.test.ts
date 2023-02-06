import * as actionTypes from '../../actionTypes.js';
import { fetchUserReturnsLegacy } from '../index.js';
import { find } from 'lodash-es';
import { getUserReturnsLegacy } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer.js';
import {
  mockNormalizedUserReturnsResponse,
  mockUserReturnsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual<object>('@farfetch/blackout-client'),
  getUserReturnsLegacy: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserReturnsLegacy action creator', () => {
  let store = usersMockStore();
  const query = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  describe('Guest Flow', () => {
    const data = {
      guestUserEmail: 'johndoe@farfetch.com',
      orderId: 'AABBCC12',
    };

    it('should create the correct actions for when the fetch user returns procedure fails', async () => {
      const expectedError = new Error('fetch user returns error');

      (getUserReturnsLegacy as jest.Mock).mockRejectedValueOnce(expectedError);

      await expect(
        fetchUserReturnsLegacy(userId, data, query)(store.dispatch),
      ).rejects.toBe(expectedError);
      expect(getUserReturnsLegacy).toHaveBeenCalledTimes(1);
      expect(getUserReturnsLegacy).toHaveBeenCalledWith(
        userId,
        data,
        query,
        expectedConfig,
      );
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
      (getUserReturnsLegacy as jest.Mock).mockResolvedValueOnce(
        mockUserReturnsResponse,
      );

      await fetchUserReturnsLegacy(userId, data, query)(store.dispatch);

      const actionResults = store.getActions();

      expect(getUserReturnsLegacy).toHaveBeenCalledTimes(1);
      expect(getUserReturnsLegacy).toHaveBeenCalledWith(
        userId,
        data,
        query,
        expectedConfig,
      );
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

  describe('Authenticated Flow', () => {
    const data = undefined;

    it('should create the correct actions for when the fetch user returns procedure fails', async () => {
      const expectedError = new Error('fetch user returns error');

      (getUserReturnsLegacy as jest.Mock).mockRejectedValueOnce(expectedError);

      await expect(
        fetchUserReturnsLegacy(userId, data, query)(store.dispatch),
      ).rejects.toBe(expectedError);
      expect(getUserReturnsLegacy).toHaveBeenCalledTimes(1);
      expect(getUserReturnsLegacy).toHaveBeenCalledWith(
        userId,
        data,
        query,
        expectedConfig,
      );
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
      (getUserReturnsLegacy as jest.Mock).mockResolvedValueOnce(
        mockUserReturnsResponse,
      );

      await fetchUserReturnsLegacy(userId, data, query)(store.dispatch);

      const actionResults = store.getActions();

      expect(getUserReturnsLegacy).toHaveBeenCalledTimes(1);
      expect(getUserReturnsLegacy).toHaveBeenCalledWith(
        userId,
        data,
        query,
        expectedConfig,
      );
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
});
