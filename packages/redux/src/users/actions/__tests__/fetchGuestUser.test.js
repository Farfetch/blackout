import {
  expectedNormalizedPayload,
  guestUserId,
  mockGuestUserResponse as mockGetGuestUserResponse,
} from '../../__fixtures__/guestUsers.fixtures';
import { fetchGuestUser } from '..';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);

describe('fetchGuestUser action creator', () => {
  let store;
  const getGuestUser = jest.fn();
  const action = fetchGuestUser(getGuestUser);
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get guest user procedure fails', async () => {
    const expectedError = new Error('get guest user error');

    getGuestUser.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(guestUserId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getGuestUser).toHaveBeenCalledTimes(1);
      expect(getGuestUser).toHaveBeenCalledWith(guestUserId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_GUEST_USER_REQUEST },
          {
            type: actionTypes.FETCH_GUEST_USER_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get guest user procedure is successful', async () => {
    getGuestUser.mockResolvedValueOnce(mockGetGuestUserResponse);

    await store.dispatch(action(guestUserId));

    const actionResults = store.getActions();

    expect(getGuestUser).toHaveBeenCalledTimes(1);
    expect(getGuestUser).toHaveBeenCalledWith(guestUserId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_GUEST_USER_REQUEST },
      {
        payload: expectedNormalizedPayload,
        type: actionTypes.FETCH_GUEST_USER_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_GUEST_USER_SUCCESS,
      }),
    ).toMatchSnapshot('get guest user success payload');
  });
});
