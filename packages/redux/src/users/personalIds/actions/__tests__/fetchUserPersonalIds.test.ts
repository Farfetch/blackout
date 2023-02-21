import * as actionTypes from '../../actionTypes';
import {
  config,
  expectedConfig,
  mockGetPersonalIdsResponse,
  userId,
} from 'tests/__fixtures__/users';
import { fetchUserPersonalIds } from '../';
import { getUserPersonalIds } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserPersonalIds: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserPersonalIds() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user personal ids procedure fails', async () => {
    const expectedError = new Error('fetch user personal ids error');

    (getUserPersonalIds as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserPersonalIds(userId, config)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserPersonalIds).toHaveBeenCalledTimes(1);
    expect(getUserPersonalIds).toHaveBeenCalledWith(userId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST },
        {
          type: actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch user personal ids procedure is successful', async () => {
    (getUserPersonalIds as jest.Mock).mockResolvedValueOnce(
      mockGetPersonalIdsResponse,
    );
    await fetchUserPersonalIds(userId, config)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserPersonalIds).toHaveBeenCalledTimes(1);
    expect(getUserPersonalIds).toHaveBeenCalledWith(userId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST },
      {
        payload: mockGetPersonalIdsResponse,
        type: actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS,
      }),
    ).toMatchSnapshot('fetch user personal ids success payload');
  });
});
