import * as actionTypes from '../../actionTypes';
import {
  config,
  expectedConfig,
  mockGetUserDefaultPersonalIdResponse,
  userId,
} from 'tests/__fixtures__/users';
import { fetchUserDefaultPersonalId } from '../';
import { getUserDefaultPersonalId } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserDefaultPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserDefaultPersonalId() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user default personal id procedure fails', async () => {
    const expectedError = new Error('fetch user default personal id error');

    (getUserDefaultPersonalId as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await fetchUserDefaultPersonalId(userId, config)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(getUserDefaultPersonalId).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST },
        {
          type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch user default personal id procedure is successful', async () => {
    (getUserDefaultPersonalId as jest.Mock).mockResolvedValueOnce(
      mockGetUserDefaultPersonalIdResponse,
    );
    await fetchUserDefaultPersonalId(userId, config)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(getUserDefaultPersonalId).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST },
      {
        payload: mockGetUserDefaultPersonalIdResponse,
        type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('fetch user default personal id success payload');
  });
});
