import * as actionTypes from '../../actionTypes.js';
import {
  config,
  expectedConfig,
  mockPostPersonalIdsData,
  mockPostPersonalIdsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { createUserPersonalId } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postUserPersonalId } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('createUserPersonalIds() action creator', () => {
  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user personal ids procedure fails', async () => {
    const expectedError = new Error('create user personal ids error');

    (postUserPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createUserPersonalId(
          userId,
          mockPostPersonalIdsData,
          config,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postUserPersonalId).toHaveBeenCalledTimes(1);
    expect(postUserPersonalId).toHaveBeenCalledWith(
      userId,
      mockPostPersonalIdsData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_USER_PERSONAL_ID_REQUEST },
        {
          type: actionTypes.CREATE_USER_PERSONAL_ID_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create user personal ids procedure is successful', async () => {
    (postUserPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPostPersonalIdsResponse,
    );
    await createUserPersonalId(
      userId,
      mockPostPersonalIdsData,
      config,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postUserPersonalId).toHaveBeenCalledTimes(1);
    expect(postUserPersonalId).toHaveBeenCalledWith(
      userId,
      mockPostPersonalIdsData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_PERSONAL_ID_REQUEST },
      {
        payload: mockPostPersonalIdsResponse,
        type: actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('create user personal ids success payload');
  });
});
