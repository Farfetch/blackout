import * as actionTypes from '../../actionTypes';
import {
  deleteUserImpersonation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { mockStore } from '../../../../../tests';
import { removeUserImpersonation } from '../..';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserImpersonation: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('removeUserImpersonation() action creator', () => {
  const impersonatedAccessTokenId = 'dsjfn-dsfnksdj';

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the delete user token procedure fails', async () => {
    const errorObject = {
      errorMessage: 'post refresh token error',
      errorCode: 0,
      status: 400,
    };

    (deleteUserImpersonation as jest.Mock).mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(removeUserImpersonation(impersonatedAccessTokenId));
    } catch (error) {
      expect(error).toBe(errorObject);
      expect(deleteUserImpersonation).toHaveBeenCalledTimes(1);
      expect(deleteUserImpersonation).toHaveBeenCalledWith(
        impersonatedAccessTokenId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.DELETE_USER_IMPERSONATION_REQUEST },
          {
            type: actionTypes.DELETE_USER_IMPERSONATION_FAILURE,
            payload: { error: toBlackoutError(errorObject) },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete user token procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    (deleteUserImpersonation as jest.Mock).mockResolvedValueOnce(mockResponse);
    await store.dispatch(removeUserImpersonation(impersonatedAccessTokenId));

    const actionResults = store.getActions();

    expect(deleteUserImpersonation).toHaveBeenCalledTimes(1);
    expect(deleteUserImpersonation).toHaveBeenCalledWith(
      impersonatedAccessTokenId,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_USER_IMPERSONATION_REQUEST },
      {
        type: actionTypes.DELETE_USER_IMPERSONATION_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_USER_IMPERSONATION_SUCCESS,
      }),
    ).toMatchSnapshot('delete user token success payload');
  });
});
