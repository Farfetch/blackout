import * as actionTypes from '../../actionTypes';
import { createClientCredentialsToken } from '../..';
import {
  mockErrorObject,
  mockCreateClientCredentialsTokenResponse as mockResponse,
} from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { postToken, toBlackoutError } from '@farfetch/blackout-client';
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

describe('createClientCredentialsToken() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the create client credentials token procedure fails', async () => {
    (postToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);
    expect.assertions(4);

    await createClientCredentialsToken()(store.dispatch).catch(error => {
      expect(error).toBe(mockErrorObject);
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
