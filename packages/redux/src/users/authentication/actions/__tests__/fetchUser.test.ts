import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedUserPayload,
  mockUsersResponse,
} from 'tests/__fixtures__/users/index.mjs';
import { fetchUser } from '../index.js';
import { find } from 'lodash-es';
import { getUser } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUser: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchUser action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user procedure fails', async () => {
    const expectedError = new Error('get user error');

    (getUser as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(async () => await fetchUser()(store.dispatch)).rejects.toThrow(
      expectedError,
    );

    expect(getUser).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledWith(expectedConfig);
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

  it('should create the correct actions for when the get user procedure is successful', async () => {
    (getUser as jest.Mock).mockResolvedValueOnce(mockUsersResponse);

    await fetchUser()(store.dispatch);

    const actionResults = store.getActions();

    expect(getUser).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledWith(expectedConfig);
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
    ).toMatchSnapshot('get user success payload');
  });
});
