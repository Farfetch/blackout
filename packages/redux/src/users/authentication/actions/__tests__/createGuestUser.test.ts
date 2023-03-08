import * as actionTypes from '../../actionTypes.js';
import { createGuestUser } from '../../../actions.js';
import {
  expectedNormalizedPayload,
  mockParamsData,
  mockGuestUserResponse as mockPostGuestUserResponse,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postGuestUser } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postGuestUser: jest.fn(),
}));

describe('createGuestUser action creator', () => {
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) =>
    mockStore({ users: INITIAL_STATE }, state);

  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create guest user procedure fails', async () => {
    const expectedError = new Error('create guest user error');

    (postGuestUser as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await createGuestUser(mockParamsData)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postGuestUser).toHaveBeenCalledTimes(1);
    expect(postGuestUser).toHaveBeenCalledWith(mockParamsData, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_GUEST_USER_REQUEST },
        {
          type: actionTypes.CREATE_GUEST_USER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create guest user procedure is successful', async () => {
    (postGuestUser as jest.Mock).mockResolvedValueOnce(
      mockPostGuestUserResponse,
    );
    await createGuestUser(mockParamsData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postGuestUser).toHaveBeenCalledTimes(1);
    expect(postGuestUser).toHaveBeenCalledWith(mockParamsData, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_GUEST_USER_REQUEST },
      {
        type: actionTypes.CREATE_GUEST_USER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_GUEST_USER_SUCCESS,
      }),
    ).toMatchSnapshot('create guest user success payload');
  });
});
