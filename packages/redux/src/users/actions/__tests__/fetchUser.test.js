import { actionTypes } from '../..';
import {
  expectedNormalizedUserPayload,
  mockUsersResponse,
} from 'tests/__fixtures__/users';
import { fetchUser } from '..';
import { getUser } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getUser: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchUser action creator', () => {
  const params = { userExtraInfo: 'Membership' };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user procedure fails', async () => {
    const expectedError = new Error('get user error');

    getUser.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchUser(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUser).toHaveBeenCalledTimes(1);
      expect(getUser).toHaveBeenCalledWith(params, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_REQUEST },
          {
            type: actionTypes.FETCH_USER_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get user procedure is successful', async () => {
    getUser.mockResolvedValueOnce(mockUsersResponse);

    await store.dispatch(fetchUser(params));

    const actionResults = store.getActions();

    expect(getUser).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledWith(params, expectedConfig);
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
