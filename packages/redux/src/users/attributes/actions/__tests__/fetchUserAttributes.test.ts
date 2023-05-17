import * as actionTypes from '../../actionTypes.js';
import { fetchUserAttributes } from '..//index.js';
import { find } from 'lodash-es';
import { getUserAttributes } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer.js';
import {
  mockGetUserAttributesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserAttributes: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchUserAttributes action creator', () => {
  let store = usersMockStore();
  const query = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch user attributes procedure fails', async () => {
    const expectedError = new Error('fetch user attributes error');

    (getUserAttributes as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserAttributes(userId, query)(store.dispatch),
    ).rejects.toThrow(expectedError);

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
  });

  it('should create the correct actions for when the fetch user attributes procedure is successful', async () => {
    (getUserAttributes as jest.Mock).mockResolvedValueOnce(
      mockGetUserAttributesResponse,
    );

    await fetchUserAttributes(userId, query)(store.dispatch);

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
