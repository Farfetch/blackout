import * as actionTypes from '../../actionTypes';
import {
  mockErrorObject,
  mockUserTokenResponse,
} from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { postToken, toBlackoutError } from '@farfetch/blackout-client';
import { refreshToken } from '../..';
import find from 'lodash/find';
import reducer from '../../reducer';

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

  it('should create the correct actions for when the refresh user token procedure fails', async () => {
    (postToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);
    expect.assertions(4);

    await refreshToken(refreshTokenValue)(store.dispatch).catch(error => {
      expect(error).toBe(mockErrorObject);
      expect(postToken).toHaveBeenCalledTimes(1);
      expect(postToken).toHaveBeenCalledWith(
        { refreshToken: refreshTokenValue, grantType: 'refresh_token' },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.REFRESH_USER_TOKEN_REQUEST },
          {
            type: actionTypes.REFRESH_USER_TOKEN_FAILURE,
            payload: { error: toBlackoutError(mockErrorObject) },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the refresh user token procedure is successful', async () => {
    (postToken as jest.Mock).mockResolvedValueOnce(mockUserTokenResponse);
    await refreshToken(refreshTokenValue)(store.dispatch);

    const actionResults = store.getActions();

    expect(postToken).toHaveBeenCalledTimes(1);
    expect(postToken).toHaveBeenCalledWith(
      { refreshToken: refreshTokenValue, grantType: 'refresh_token' },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.REFRESH_USER_TOKEN_REQUEST },
      {
        type: actionTypes.REFRESH_USER_TOKEN_SUCCESS,
        payload: mockUserTokenResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REFRESH_USER_TOKEN_SUCCESS,
        payload: mockUserTokenResponse,
      }),
    ).toMatchSnapshot('refresh user token success payload');
  });
});
