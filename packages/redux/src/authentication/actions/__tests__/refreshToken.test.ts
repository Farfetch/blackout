import { mockStore } from '../../../../tests';
import { postTokens } from '@farfetch/blackout-client/authentication';
import { refreshToken } from '..';
import { toError } from '@farfetch/blackout-client/helpers/client';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/authentication', () => ({
  ...jest.requireActual('@farfetch/blackout-client/authentication'),
  postTokens: jest.fn(),
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

  it('should create the correct actions for when the refresh user token procedure fails', async () => {
    const errorObject = {
      errorMessage: 'post user token error',
      errorCode: 0,
      status: 400,
    };

    (postTokens as jest.Mock).mockRejectedValueOnce(errorObject);
    expect.assertions(4);
    try {
      await store.dispatch(refreshToken(refreshTokenValue));
    } catch (error) {
      expect(error).toBe(errorObject);
      expect(postTokens).toHaveBeenCalledTimes(1);
      expect(postTokens).toHaveBeenCalledWith(
        { refreshToken: refreshTokenValue, grantType: 'refresh_token' },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.REFRESH_USER_TOKEN_REQUEST },
          {
            type: actionTypes.REFRESH_USER_TOKEN_FAILURE,
            payload: { error: toError(errorObject) },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the refresh user token procedure is successful', async () => {
    const mockResponse = {
      accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
      expiresIn: '1200',
      refreshToken:
        'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
    };

    (postTokens as jest.Mock).mockResolvedValueOnce(mockResponse);
    await store.dispatch(refreshToken(refreshTokenValue));

    const actionResults = store.getActions();

    expect(postTokens).toHaveBeenCalledTimes(1);
    expect(postTokens).toHaveBeenCalledWith(
      { refreshToken: refreshTokenValue, grantType: 'refresh_token' },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.REFRESH_USER_TOKEN_REQUEST },
      {
        type: actionTypes.REFRESH_USER_TOKEN_SUCCESS,
        payload: mockResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REFRESH_USER_TOKEN_SUCCESS,
        payload: mockResponse,
      }),
    ).toMatchSnapshot('refresh user token success payload');
  });
});
