import * as actionTypes from '../../actionTypes';
import { createUserImpersonation } from '../..';
import { mockStore } from '../../../../../tests';
import {
  postUserImpersonation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserImpersonation: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('createUserImpersonation() action creator', () => {
  const data = {
    username: 'user1',
    password: 'pass123',
    impersonateeUserName: 'user.to.impersonate@anyplace.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the create user impersonation procedure fails', async () => {
    const errorObject = {
      errorMessage: 'post user token error',
      errorCode: 0,
      status: 400,
    };

    (postUserImpersonation as jest.Mock).mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(createUserImpersonation(data));
    } catch (error) {
      expect(error).toBe(errorObject);
      expect(postUserImpersonation).toHaveBeenCalledTimes(1);
      expect(postUserImpersonation).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_USER_IMPERSONATION_REQUEST },
          {
            type: actionTypes.CREATE_USER_IMPERSONATION_FAILURE,
            payload: { error: toBlackoutError(errorObject) },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create user impersonation procedure is successful', async () => {
    const mockResponse = {
      accessToken: '60f9ff83-d723-4c5a-8268-00cee557083b',
      expiresIn: '3600',
      refreshToken: '',
    };

    (postUserImpersonation as jest.Mock).mockResolvedValueOnce(mockResponse);
    await store.dispatch(createUserImpersonation(data));

    const actionResults = store.getActions();

    expect(postUserImpersonation).toHaveBeenCalledTimes(1);
    expect(postUserImpersonation).toHaveBeenCalledWith(data, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_IMPERSONATION_REQUEST },
      {
        type: actionTypes.CREATE_USER_IMPERSONATION_SUCCESS,
        payload: mockResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_IMPERSONATION_SUCCESS,
        payload: mockResponse,
      }),
    ).toMatchSnapshot('create user impersonation success payload');
  });
});
