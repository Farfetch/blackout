import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedPayload,
  mockResponse,
  mockUnverifiedUserResponse,
} from 'tests/__fixtures__/authentication/index.mjs';
import { find } from 'lodash-es';
import { login } from '../../index.js';
import {
  mockErrorObject,
  mockLoginData,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postLogin, toBlackoutError } from '@farfetch/blackout-client';
import reducer from '../../reducer.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postLogin: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('login() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the login procedure fails', async () => {
    (postLogin as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await login(mockLoginData)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(postLogin).toHaveBeenCalledWith(mockLoginData, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.LOGIN_REQUEST },
        {
          type: actionTypes.LOGIN_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the login procedure is successful', async () => {
    (postLogin as jest.Mock).mockResolvedValueOnce(mockResponse);
    await login(mockLoginData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(postLogin).toHaveBeenCalledWith(mockLoginData, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.LOGIN_REQUEST },
      {
        type: actionTypes.LOGIN_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.LOGIN_SUCCESS,
      }),
    ).toMatchSnapshot('login success payload');
  });

  it('should create the correct actions for when the unverified login procedure is successful', async () => {
    (postLogin as jest.Mock).mockResolvedValueOnce({
      ...mockUnverifiedUserResponse,
      status: 4,
    });
    await login(mockLoginData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(postLogin).toHaveBeenCalledWith(mockLoginData, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.LOGIN_REQUEST },
      {
        type: actionTypes.LOGIN_SUCCESS,
        payload: { entities: { user: {} }, result: null },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.LOGIN_SUCCESS,
      }),
    ).toMatchSnapshot('login success payload');
  });
});
