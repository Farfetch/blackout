import {
  expectedNormalizedPayload,
  mockUsersResponse,
} from '../../__fixtures__/users.fixtures';
import { fetchUser } from '..';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);
const expectedConfig = undefined;
let store;

describe('fetchUser action creator', () => {
  const getUser = jest.fn();
  const action = fetchUser(getUser);
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
      await store.dispatch(action(params));
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

    await store.dispatch(action(params));

    const actionResults = store.getActions();

    expect(getUser).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledWith(params, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_REQUEST },
      {
        payload: expectedNormalizedPayload,
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
