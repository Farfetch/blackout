import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedPayload,
  guestUserId,
  mockGuestUserResponse as mockGetGuestUserResponse,
} from 'tests/__fixtures__/users/index.mjs';
import { fetchGuestUser } from '../index.js';
import { find } from 'lodash-es';
import { getGuestUser } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getGuestUser: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchGuestUser action creator', () => {
  let store = usersMockStore();
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get guest user procedure fails', async () => {
    const expectedError = new Error('get guest user error');

    (getGuestUser as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchGuestUser(guestUserId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getGuestUser).toHaveBeenCalledTimes(1);
    expect(getGuestUser).toHaveBeenCalledWith(guestUserId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_GUEST_USER_REQUEST },
        {
          type: actionTypes.FETCH_GUEST_USER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get guest user procedure is successful', async () => {
    (getGuestUser as jest.Mock).mockResolvedValueOnce(mockGetGuestUserResponse);

    await fetchGuestUser(guestUserId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getGuestUser).toHaveBeenCalledTimes(1);
    expect(getGuestUser).toHaveBeenCalledWith(guestUserId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_GUEST_USER_REQUEST },
      {
        payload: expectedNormalizedPayload,
        type: actionTypes.FETCH_GUEST_USER_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_GUEST_USER_SUCCESS,
      }),
    ).toMatchSnapshot('get guest user success payload');
  });
});
