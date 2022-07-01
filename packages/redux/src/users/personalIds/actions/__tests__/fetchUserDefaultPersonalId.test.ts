import * as actionTypes from '../../actionTypes';
import { fetchUserDefaultPersonalId } from '../';
import { getUserDefaultPersonalId } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockGetUserDefaultPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserDefaultPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserDefaultPersonalId action creator', () => {
  let store = usersMockStore();
  const userId = 12345;
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch default personal id procedure fails', async () => {
    const expectedError = new Error('fetch default personal id error');
    (getUserDefaultPersonalId as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(fetchUserDefaultPersonalId(userId, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserDefaultPersonalId).toHaveBeenCalledTimes(1);
      expect(getUserDefaultPersonalId).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch default personal id procedure is successful', async () => {
    (getUserDefaultPersonalId as jest.Mock).mockResolvedValueOnce(
      mockGetUserDefaultPersonalIdResponse,
    );
    await store.dispatch(fetchUserDefaultPersonalId(userId, config));

    const actionResults = store.getActions();

    expect(getUserDefaultPersonalId).toHaveBeenCalledTimes(1);
    expect(getUserDefaultPersonalId).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST },
      {
        payload: mockGetUserDefaultPersonalIdResponse,
        type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('fetch default personal id success payload');
  });
});
