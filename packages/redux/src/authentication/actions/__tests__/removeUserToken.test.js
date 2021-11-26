import { deleteTokens } from '@farfetch/blackout-client/authentication';
import { mockStore } from '../../../../tests';
import { removeUserToken } from '..';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/authentication', () => ({
  ...jest.requireActual('@farfetch/blackout-client/authentication'),
  deleteTokens: jest.fn(),
}));

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('removeUserToken() action creator', () => {
  const userTokenId = 'dsjfn-dsfnksdj';

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the delete user token procedure fails', async () => {
    const errorObject = {
      errorMessage: 'delete user token error',
      errorCode: 0,
      status: 400,
    };

    deleteTokens.mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(removeUserToken(userTokenId));
    } catch (error) {
      expect(error).toBe(errorObject);
      expect(deleteTokens).toHaveBeenCalledTimes(1);
      expect(deleteTokens).toHaveBeenCalledWith(userTokenId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.DELETE_USER_TOKEN_REQUEST },
          {
            type: actionTypes.DELETE_USER_TOKEN_FAILURE,
            payload: { error: errorObject },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete user token procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    deleteTokens.mockResolvedValueOnce(mockResponse);
    await store.dispatch(removeUserToken(userTokenId));

    const actionResults = store.getActions();

    expect(deleteTokens).toHaveBeenCalledTimes(1);
    expect(deleteTokens).toHaveBeenCalledWith(userTokenId, expectedConfig);

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
