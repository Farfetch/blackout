import * as actionTypes from '../../actionTypes.js';
import {
  config,
  expectedConfig,
  mockPutDefaultPersonalIdData,
  mockPutDefaultPersonalIdResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { putUserDefaultPersonalId } from '@farfetch/blackout-client';
import { setUserDefaultPersonalId } from '..//index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserDefaultPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('setUserDefaultPersonalId() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the set user default personal id procedure fails', async () => {
    const expectedError = new Error('set user default personal id error');

    (putUserDefaultPersonalId as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await setUserDefaultPersonalId(
          userId,
          mockPutDefaultPersonalIdData,
          config,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(putUserDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(putUserDefaultPersonalId).toHaveBeenCalledWith(
      userId,
      mockPutDefaultPersonalIdData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST },
        {
          type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set user default personal id procedure is successful', async () => {
    (putUserDefaultPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPutDefaultPersonalIdResponse,
    );
    await setUserDefaultPersonalId(
      userId,
      mockPutDefaultPersonalIdData,
      config,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(putUserDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(putUserDefaultPersonalId).toHaveBeenCalledWith(
      userId,
      mockPutDefaultPersonalIdData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST },
      {
        payload: mockPutDefaultPersonalIdResponse,
        type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('set user default personal id success payload');
  });
});
