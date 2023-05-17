import * as actionTypes from '../../actionTypes.js';
import {
  config,
  expectedConfig,
  mockPersonalIdResponse,
  personalId,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { deleteUserPersonalId } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserPersonalId } from '..//index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('removeUserPersonalId() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the remove user personal id procedure fails', async () => {
    const expectedError = new Error('remove user personal id error');

    (deleteUserPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await removeUserPersonalId(userId, personalId, config)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteUserPersonalId).toHaveBeenCalledTimes(1);
    expect(deleteUserPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST },
        {
          type: actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the remove user personal id procedure is successful', async () => {
    (deleteUserPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPersonalIdResponse,
    );

    await removeUserPersonalId(userId, personalId, config)(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteUserPersonalId).toHaveBeenCalledTimes(1);
    expect(deleteUserPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.REMOVE_USER_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('remove user personal id success payload');
  });
});
