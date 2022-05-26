import {
  expectedNormalizedPayload,
  mockResponse,
  mockUnverifiedUserResponse,
} from 'tests/__fixtures__/authentication';
import { mockStore } from '../../../../tests';
import { postRegister } from '@farfetch/blackout-client/authentication';
import { register } from '..';
import { toError } from '@farfetch/blackout-client/helpers/client';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/authentication', () => ({
  ...jest.requireActual('@farfetch/blackout-client/authentication'),
  postRegister: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('register() action creator', () => {
  const registerMockData = {
    countryCode: 'PT',
    email: 'pepe@acme.com',
    name: 'Pepe',
    password: 'pepe123',
    receiveNewsLetters: true,
    username: 'pepe@acme.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the register procedure fails', async () => {
    const errorObject = {
      errorMessage: 'post register error',
      errorCode: 0,
      status: 400,
    };

    (postRegister as jest.Mock).mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(register(registerMockData));
    } catch (error) {
      expect(error).toBe(errorObject);
      expect(postRegister).toHaveBeenCalledTimes(1);
      expect(postRegister).toHaveBeenCalledWith(
        registerMockData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.REGISTER_REQUEST },
          {
            type: actionTypes.REGISTER_FAILURE,
            payload: { error: toError(errorObject) },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the normal register procedure is successful', async () => {
    (postRegister as jest.Mock).mockResolvedValueOnce(mockResponse);
    await store.dispatch(register(registerMockData));

    const actionResults = store.getActions();

    expect(postRegister).toHaveBeenCalledTimes(1);
    expect(postRegister).toHaveBeenCalledWith(registerMockData, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.REGISTER_REQUEST },
      {
        type: actionTypes.REGISTER_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REGISTER_SUCCESS,
      }),
    ).toMatchSnapshot('register success payload');
  });

  it('should create the correct actions for when the unverified register procedure is successful', async () => {
    (postRegister as jest.Mock).mockResolvedValueOnce(
      mockUnverifiedUserResponse,
    );
    await store.dispatch(register(registerMockData));

    const actionResults = store.getActions();

    expect(postRegister).toHaveBeenCalledTimes(1);
    expect(postRegister).toHaveBeenCalledWith(registerMockData, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.REGISTER_REQUEST },
      {
        type: actionTypes.REGISTER_SUCCESS,
        payload: { entities: { user: {} }, result: null },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REGISTER_SUCCESS,
      }),
    ).toMatchSnapshot('unverified register success payload');
  });
});
