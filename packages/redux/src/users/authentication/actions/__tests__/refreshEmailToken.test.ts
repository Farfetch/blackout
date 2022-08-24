import * as actionTypes from '../../actionTypes';
import { mockErrorObject, mockLoginData } from 'tests/__fixtures__/users';
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
  const refreshTokenData = {
    username: mockLoginData.username,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the refresh token procedure fails', async () => {
    (postRefreshEmailToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);
    expect.assertions(4);

    await refreshEmailToken(refreshTokenData)(store.dispatch).catch(error => {
      expect(error).toBe(mockErrorObject);
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
