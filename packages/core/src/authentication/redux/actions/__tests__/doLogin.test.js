import {
  expectedNormalizedPayload,
  mockResponse,
  mockUnverifiedUserResponse,
} from '../../__fixtures__/authentication.fixtures';
import { mockStore } from '../../../../../tests';
import doLogin from '../doLogin';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doLogin() action creator', () => {
  const postLogin = jest.fn();
  const action = doLogin(postLogin);

  const data = {
    userName: 'pepe@acme.com',
    password: '123465',
    rememberMe: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the login procedure fails', async () => {
    const errorObject = {
      errorMessage: 'post login error',
      errorCode: 0,
      status: 400,
    };

    postLogin.mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(errorObject);
      expect(postLogin).toHaveBeenCalledTimes(1);
      expect(postLogin).toHaveBeenCalledWith(data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.LOGIN_REQUEST },
          {
            type: actionTypes.LOGIN_FAILURE,
            payload: { error: errorObject },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the login procedure is successful', async () => {
    postLogin.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(postLogin).toHaveBeenCalledWith(data, expectedConfig);

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
    postLogin.mockResolvedValueOnce(mockUnverifiedUserResponse);
    await store.dispatch(action(data));

    const actionResults = store.getActions();

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(postLogin).toHaveBeenCalledWith(data, expectedConfig);

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
