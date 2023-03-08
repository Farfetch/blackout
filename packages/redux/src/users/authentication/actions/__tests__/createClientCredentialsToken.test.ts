import * as actionTypes from '../../actionTypes.js';
import { createClientCredentialsToken } from '../../index.js';
import { find } from 'lodash-es';
import {
  mockErrorObject,
  mockCreateClientCredentialsTokenResponse as mockResponse,
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

describe('createClientCredentialsToken() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the create client credentials token procedure fails', async () => {
    (postToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await createClientCredentialsToken()(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postToken).toHaveBeenCalledTimes(1);
    expect(postToken).toHaveBeenCalledWith(
      { grantType: 'client_credentials' },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST },
        {
          type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create client credentials token procedure is successful', async () => {
    (postToken as jest.Mock).mockResolvedValueOnce(mockResponse);
    await createClientCredentialsToken()(store.dispatch);

    const actionResults = store.getActions();

    expect(postToken).toHaveBeenCalledTimes(1);
    expect(postToken).toHaveBeenCalledWith(
      { grantType: 'client_credentials' },
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST },
      {
        type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
        payload: mockResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
        payload: mockResponse,
      }),
    ).toMatchSnapshot('create client credentials token success payload');
  });
});
