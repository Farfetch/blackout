import {
  expectedNormalizedPayload,
  mockResponse,
  mockUnverifiedUserResponse,
} from 'tests/__fixtures__/authentication';
import { mockStore } from '../../../../tests';
import { postRegister } from '@farfetch/blackout-client/authentication';
import { register } from '..';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/authentication', () => ({
  ...jest.requireActual('@farfetch/blackout-client/authentication'),
  postRegister: jest.fn(),
}));

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('register() action creator', () => {
  const registerMockData = {
    countryCode: 'PT',
    Email: 'pepe@acme.com',
    Name: 'Pepe',
    Password: 'pepe123',
    ReceiveNewsLetters: true,
    Username: 'pepe@acme.com',
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

    postRegister.mockRejectedValueOnce(errorObject);
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
            payload: { error: errorObject },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the normal register procedure is successful', async () => {
    postRegister.mockResolvedValueOnce(mockResponse);
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
    postRegister.mockResolvedValueOnce(mockUnverifiedUserResponse);
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
