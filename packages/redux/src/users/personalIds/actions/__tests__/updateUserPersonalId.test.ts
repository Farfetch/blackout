import * as actionTypes from '../../actionTypes.js';
import {
  config,
  expectedConfig,
  mockPersonalIdResponse,
  mockPostPersonalIdsData,
  personalId,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { patchUserPersonalId } from '@farfetch/blackout-client';
import { updateUserPersonalId } from '..//index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchUserPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('updateUserPersonalId() action creator', () => {
  let store = usersMockStore();

  const data = {
    ...mockPostPersonalIdsData,
    expiryDate: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update user personal id procedure fails', async () => {
    const expectedError = new Error('update user personal id error');

    (patchUserPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateUserPersonalId(
          userId,
          personalId,
          data,
          config,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchUserPersonalId).toHaveBeenCalledTimes(1);
    expect(patchUserPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.UPDATE_USER_PERSONAL_ID_REQUEST },
        {
          type: actionTypes.UPDATE_USER_PERSONAL_ID_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the update user personal id procedure is successful', async () => {
    (patchUserPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPersonalIdResponse,
    );

    await updateUserPersonalId(
      userId,
      personalId,
      data,
      config,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(patchUserPersonalId).toHaveBeenCalledTimes(1);
    expect(patchUserPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_USER_PERSONAL_ID_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.UPDATE_USER_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('update user personal id success payload');
  });
});
