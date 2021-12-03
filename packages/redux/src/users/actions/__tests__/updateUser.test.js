import {
  expectedNormalizedPayload,
  mockUsersResponse,
} from '../../__fixtures__/users.fixtures';
import { mockStore } from '../../../../tests';
import { updateUser } from '..';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);
const expectedConfig = undefined;
let store;

describe('updateUser action creator', () => {
  const userId = 29538482;
  const mockRequestBody = {
    name: 'anon',
    email: 'anonaccount@ff.com',
  };
  const putUser = jest.fn();
  const action = updateUser(putUser);

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update user procedure fails', async () => {
    const expectedError = new Error('update user error');

    putUser.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, {}));
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
    putUser.mockResolvedValueOnce(mockUsersResponse);

    await store.dispatch(action(userId, mockRequestBody));

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
        payload: expectedNormalizedPayload,
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
