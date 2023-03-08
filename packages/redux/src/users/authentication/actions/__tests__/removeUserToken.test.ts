import * as actionTypes from '../../actionTypes.js';
import { deleteToken, toBlackoutError } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import {
  mockErrorObject,
  userTokenId,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserToken } from '../../index.js';
import reducer from '../../reducer.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteToken: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('removeUserToken() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the delete user token procedure fails', async () => {
    (deleteToken as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await removeUserToken(userTokenId)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(deleteToken).toHaveBeenCalledTimes(1);
    expect(deleteToken).toHaveBeenCalledWith(userTokenId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.DELETE_USER_TOKEN_REQUEST },
        {
          type: actionTypes.DELETE_USER_TOKEN_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the delete user token procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    (deleteToken as jest.Mock).mockResolvedValueOnce(mockResponse);
    await removeUserToken(userTokenId)(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteToken).toHaveBeenCalledTimes(1);
    expect(deleteToken).toHaveBeenCalledWith(userTokenId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_USER_TOKEN_REQUEST },
      {
        type: actionTypes.DELETE_USER_TOKEN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_USER_TOKEN_SUCCESS,
      }),
    ).toMatchSnapshot('delete user token success payload');
  });
});
