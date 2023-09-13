import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/authentication/index.mjs';
import { find } from 'lodash-es';
import {
  mockErrorObject,
  mockSocialLoginData,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postSocialLogin, toBlackoutError } from '@farfetch/blackout-client';
import { socialLogin } from '../../index.js';
import reducer from '../../reducer.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postSocialLogin: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('socialLogin() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the socialLogin procedure fails', async () => {
    (postSocialLogin as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await socialLogin(mockSocialLoginData)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postSocialLogin).toHaveBeenCalledTimes(1);
    expect(postSocialLogin).toHaveBeenCalledWith(
      mockSocialLoginData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.SOCIAL_LOGIN_REQUEST },
        {
          type: actionTypes.SOCIAL_LOGIN_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the socialLogin procedure is successful', async () => {
    (postSocialLogin as jest.Mock).mockResolvedValueOnce(mockResponse);
    await socialLogin(mockSocialLoginData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postSocialLogin).toHaveBeenCalledTimes(1);
    expect(postSocialLogin).toHaveBeenCalledWith(
      mockSocialLoginData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.SOCIAL_LOGIN_REQUEST },
      {
        type: actionTypes.SOCIAL_LOGIN_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SOCIAL_LOGIN_SUCCESS,
      }),
    ).toMatchSnapshot('socialLogin success payload');
  });
});
