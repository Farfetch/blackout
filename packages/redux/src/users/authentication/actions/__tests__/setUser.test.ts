import * as actionTypes from '../../actionTypes';
import {
  expectedNormalizedUserPayload,
  mockUsersResponse,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { putUser, PutUserData } from '@farfetch/blackout-client';
import { setUser } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUser: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('updateUser action creator', () => {
  const userId = 29538482;
  const mockRequestBody = {
    name: 'anon',
    email: 'anonaccount@ff.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update user procedure fails', async () => {
    const expectedError = new Error('update user error');

    (putUser as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setUser(userId, {} as PutUserData));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the update user procedure is successful', async () => {
    (putUser as jest.Mock).mockResolvedValueOnce(mockUsersResponse);

    await store.dispatch(setUser(userId, mockRequestBody));

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
