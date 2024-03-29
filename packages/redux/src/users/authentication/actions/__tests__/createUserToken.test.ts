import * as actionTypes from '../../actionTypes.js';
import { createUserToken } from '../../index.js';
import { find } from 'lodash-es';
import {
  mockCreateUserTokenData,
  mockErrorObject,
  mockUserTokenResponse,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postToken, toBlackoutError } from '@farfetch/blackout-client';
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

describe('createUserToken() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the create user token procedure fails', async () => {
    (postToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () =>
        await createUserToken(mockCreateUserTokenData)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postToken).toHaveBeenCalledTimes(1);
    expect(postToken).toHaveBeenCalledWith(
      { ...mockCreateUserTokenData, grantType: 'password' },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_USER_TOKEN_REQUEST },
        {
          type: actionTypes.CREATE_USER_TOKEN_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create user token procedure is successful', async () => {
    (postToken as jest.Mock).mockResolvedValueOnce(mockUserTokenResponse);
    await createUserToken(mockCreateUserTokenData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postToken).toHaveBeenCalledTimes(1);
    expect(postToken).toHaveBeenCalledWith(
      { ...mockCreateUserTokenData, grantType: 'password' },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_TOKEN_REQUEST },
      {
        type: actionTypes.CREATE_USER_TOKEN_SUCCESS,
        payload: mockUserTokenResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_TOKEN_SUCCESS,
        payload: mockUserTokenResponse,
      }),
    ).toMatchSnapshot('create user token success payload');
  });
});
