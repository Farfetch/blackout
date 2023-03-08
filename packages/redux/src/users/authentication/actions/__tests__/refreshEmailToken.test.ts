import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import {
  mockErrorObject,
  mockLoginData,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import {
  postRefreshEmailToken,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { refreshEmailToken } from '../../index.js';
import reducer from '../../reducer.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postRefreshEmailToken: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('refreshEmailToken() action creator', () => {
  const refreshTokenData = {
    username: mockLoginData.username,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the refresh token procedure fails', async () => {
    (postRefreshEmailToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await refreshEmailToken(refreshTokenData)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postRefreshEmailToken).toHaveBeenCalledTimes(1);
    expect(postRefreshEmailToken).toHaveBeenCalledWith(
      refreshTokenData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REFRESH_EMAIL_TOKEN_REQUEST },
        {
          type: actionTypes.REFRESH_EMAIL_TOKEN_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the refresh token procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    (postRefreshEmailToken as jest.Mock).mockResolvedValueOnce(mockResponse);
    await refreshEmailToken(refreshTokenData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postRefreshEmailToken).toHaveBeenCalledTimes(1);
    expect(postRefreshEmailToken).toHaveBeenCalledWith(
      refreshTokenData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.REFRESH_EMAIL_TOKEN_REQUEST },
      {
        type: actionTypes.REFRESH_EMAIL_TOKEN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REFRESH_EMAIL_TOKEN_SUCCESS,
      }),
    ).toMatchSnapshot('refresh token success payload');
  });
});
