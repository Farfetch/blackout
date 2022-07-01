import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import {
  postRefreshEmailToken,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { refreshEmailToken } from '../..';
import find from 'lodash/find';
import reducer from '../../reducer';

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
  const data = {
    userName: 'pepe@acme.com',
    password: '123465',
    rememberMe: true,
  };
  const refreshTokenData = {
    username: data.userName,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the refresh token procedure fails', async () => {
    const errorObject = {
      errorMessage: 'post refresh token error',
      errorCode: 0,
      status: 400,
    };

    (postRefreshEmailToken as jest.Mock).mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(refreshEmailToken(refreshTokenData));
    } catch (error) {
      expect(error).toBe(errorObject);
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
            payload: { error: toBlackoutError(errorObject) },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the refresh token procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    (postRefreshEmailToken as jest.Mock).mockResolvedValueOnce(mockResponse);
    await store.dispatch(refreshEmailToken(refreshTokenData));

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
