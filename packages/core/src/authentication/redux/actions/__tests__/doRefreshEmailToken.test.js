import { doRefreshEmailToken } from '../';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doRefreshEmailToken() action creator', () => {
  const postRefreshEmailToken = jest.fn();
  const action = doRefreshEmailToken(postRefreshEmailToken);

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

    postRefreshEmailToken.mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(action(refreshTokenData));
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
            payload: { error: errorObject },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the refresh token procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    postRefreshEmailToken.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(refreshTokenData));

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
