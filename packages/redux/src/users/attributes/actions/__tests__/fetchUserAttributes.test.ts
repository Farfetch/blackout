import * as actionTypes from '../../actionTypes';
import { fetchUserAttributes } from '../';
import { getUserAttributes } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockGetUserAttributesResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserAttributes: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserAttributes action creator', () => {
  let store = usersMockStore();
  const userId = 123456789;
  const query = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user attributes procedure fails', async () => {
    const expectedError = new Error('fetch user attributes error');

    (getUserAttributes as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchUserAttributes(userId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserAttributes).toHaveBeenCalledTimes(1);
      expect(getUserAttributes).toHaveBeenCalledWith(
        userId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_ATTRIBUTES_REQUEST },
          {
            type: actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch user attributes procedure is successful', async () => {
    (getUserAttributes as jest.Mock).mockResolvedValueOnce(
      mockGetUserAttributesResponse,
    );

    await store.dispatch(fetchUserAttributes(userId, query));

    const actionResults = store.getActions();

    expect(getUserAttributes).toHaveBeenCalledTimes(1);
    expect(getUserAttributes).toHaveBeenCalledWith(
      userId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_ATTRIBUTES_REQUEST },
      {
        payload: mockGetUserAttributesResponse,
        type: actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
      }),
    ).toMatchSnapshot('fetch user attributes success payload');
  });
});
