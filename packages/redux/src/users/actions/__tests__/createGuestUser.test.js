import { createGuestUser } from '..';
import {
  expectedNormalizedPayload,
  mockGuestUserResponse as mockPostGuestUserResponse,
} from '../../__fixtures__/guestUsers.fixtures';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('createGuestUser action creator', () => {
  let store;
  const postGuestUser = jest.fn();
  const action = createGuestUser(postGuestUser);
  const params = { countryId: 'PT', ip: 'IP address of the guest user' };
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create guest user procedure fails', async () => {
    const expectedError = new Error('create guest user error');

    postGuestUser.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postGuestUser).toHaveBeenCalledTimes(1);
      expect(postGuestUser).toHaveBeenCalledWith(params, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_GUEST_USER_REQUEST },
          {
            type: actionTypes.CREATE_GUEST_USER_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create guest user procedure is successful', async () => {
    postGuestUser.mockResolvedValueOnce(mockPostGuestUserResponse);
    await store.dispatch(action(params));

    const actionResults = store.getActions();

    expect(postGuestUser).toHaveBeenCalledTimes(1);
    expect(postGuestUser).toHaveBeenCalledWith(params, expectedConfig);

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
