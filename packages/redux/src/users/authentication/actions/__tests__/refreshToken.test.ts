import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import {
  mockErrorObject,
  mockUserTokenResponse,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postToken, toBlackoutError } from '@farfetch/blackout-client';
import { refreshToken } from '../../index.js';
import reducer from '../../reducer.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postToken: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('refreshToken() action creator', () => {
  const refreshTokenValue = 'jsbhbhds8278jbnjb34';

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the refresh token procedure fails', async () => {
    (postToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await refreshToken(refreshTokenValue)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postToken).toHaveBeenCalledTimes(1);
    expect(postToken).toHaveBeenCalledWith(
      { refreshToken: refreshTokenValue, grantType: 'refresh_token' },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REFRESH_TOKEN_REQUEST },
        {
          type: actionTypes.REFRESH_TOKEN_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the refresh token procedure is successful', async () => {
    (postToken as jest.Mock).mockResolvedValueOnce(mockUserTokenResponse);
    await refreshToken(refreshTokenValue)(store.dispatch);

    const actionResults = store.getActions();

    expect(postToken).toHaveBeenCalledTimes(1);
    expect(postToken).toHaveBeenCalledWith(
      { refreshToken: refreshTokenValue, grantType: 'refresh_token' },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.REFRESH_TOKEN_REQUEST },
      {
        type: actionTypes.REFRESH_TOKEN_SUCCESS,
        payload: mockUserTokenResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REFRESH_TOKEN_SUCCESS,
        payload: mockUserTokenResponse,
      }),
    ).toMatchSnapshot('refresh token success payload');
  });
});
