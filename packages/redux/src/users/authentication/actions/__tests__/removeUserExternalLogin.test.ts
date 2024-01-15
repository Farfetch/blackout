import * as actionTypes from '../../actionTypes.js';
import { deleteUserExternalLogin } from '@farfetch/blackout-client';
import { externalLoginId, userId } from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserExternalLogin } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserExternalLogin: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('deleteUserExternalLogin action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the delete user external login procedure fails', async () => {
    const expectedError = new Error('delete user external login error');

    (deleteUserExternalLogin as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeUserExternalLogin(userId, externalLoginId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteUserExternalLogin).toHaveBeenCalledTimes(1);
    expect(deleteUserExternalLogin).toHaveBeenCalledWith(
      userId,
      externalLoginId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_REQUEST },
        {
          type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the delete user external login procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    (deleteUserExternalLogin as jest.Mock).mockResolvedValueOnce(mockResponse);

    await removeUserExternalLogin(userId, externalLoginId)(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteUserExternalLogin).toHaveBeenCalledTimes(1);
    expect(deleteUserExternalLogin).toHaveBeenCalledWith(
      userId,
      externalLoginId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_REQUEST },
      {
        meta: { externalLoginId },
        type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_SUCCESS,
      }),
    ).toMatchSnapshot('delete user external login success payload');
  });
});
