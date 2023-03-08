import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedPayload,
  mockResponse,
  mockUnverifiedUserResponse,
} from 'tests/__fixtures__/authentication/index.mjs';
import { find } from 'lodash-es';
import {
  mockErrorObject,
  mockRegisterData,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postUser, toBlackoutError } from '@farfetch/blackout-client';
import { register } from '../../index.js';
import reducer from '../../reducer.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUser: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('register() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the register procedure fails', async () => {
    (postUser as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await register(mockRegisterData)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postUser).toHaveBeenCalledTimes(1);
    expect(postUser).toHaveBeenCalledWith(mockRegisterData, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REGISTER_REQUEST },
        {
          type: actionTypes.REGISTER_FAILURE,
          payload: { error: toBlackoutError(mockErrorObject) },
        },
      ]),
    );
  });

  it('should create the correct actions for when the normal register procedure is successful', async () => {
    (postUser as jest.Mock).mockResolvedValueOnce(mockResponse);
    await register(mockRegisterData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postUser).toHaveBeenCalledTimes(1);
    expect(postUser).toHaveBeenCalledWith(mockRegisterData, expectedConfig);

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
    (postUser as jest.Mock).mockResolvedValueOnce(mockUnverifiedUserResponse);
    await register(mockRegisterData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postUser).toHaveBeenCalledTimes(1);
    expect(postUser).toHaveBeenCalledWith(mockRegisterData, expectedConfig);

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
