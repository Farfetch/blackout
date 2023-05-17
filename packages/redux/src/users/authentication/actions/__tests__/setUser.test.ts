import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedUserPayload,
  mockUsersResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { putUser, type PutUserData } from '@farfetch/blackout-client';
import { setUser } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUser: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('setUser action creator', () => {
  const mockRequestBody = {
    name: 'anon',
    email: 'anonaccount@ff.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the set user procedure fails', async () => {
    const expectedError = new Error('update user error');

    (putUser as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await setUser(userId, {} as PutUserData)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(putUser).toHaveBeenCalledTimes(1);
    expect(putUser).toHaveBeenCalledWith(userId, {}, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.UPDATE_USER_REQUEST },
        {
          type: actionTypes.UPDATE_USER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set user procedure is successful', async () => {
    (putUser as jest.Mock).mockResolvedValueOnce(mockUsersResponse);

    await setUser(userId, mockRequestBody)(store.dispatch);

    const actionResults = store.getActions();

    expect(putUser).toHaveBeenCalledTimes(1);
    expect(putUser).toHaveBeenCalledWith(
      userId,
      mockRequestBody,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_USER_REQUEST },
      {
        payload: expectedNormalizedUserPayload,
        type: actionTypes.UPDATE_USER_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_SUCCESS,
      }),
    ).toMatchSnapshot('update user success payload');
  });
});
