import * as actionTypes from '../../actionTypes.js';
import {
  expectedNormalizedPayload,
  mockResponse,
  mockUnverifiedUserLegacyResponse,
} from 'tests/__fixtures__/authentication/index.mjs';
import { find } from 'lodash-es';
import {
  mockErrorObject,
  mockRegisterData,
} from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postUserLegacy, toBlackoutError } from '@farfetch/blackout-client';
import reducer from '../../reducer.js';
import registerLegacy from '../registerLegacy.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserLegacy: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('registerLegacy() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the register procedure fails', async () => {
    (postUserLegacy as jest.Mock).mockRejectedValueOnce(mockErrorObject);

    await expect(
      async () => await registerLegacy(mockRegisterData)(store.dispatch),
    ).rejects.toThrow(mockErrorObject);

    expect(postUserLegacy).toHaveBeenCalledTimes(1);
    expect(postUserLegacy).toHaveBeenCalledWith(
      mockRegisterData,
      expectedConfig,
    );
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

  it('should create the correct actions for when the normal register legacy procedure is successful', async () => {
    (postUserLegacy as jest.Mock).mockResolvedValueOnce(mockResponse);
    await registerLegacy(mockRegisterData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postUserLegacy).toHaveBeenCalledTimes(1);
    expect(postUserLegacy).toHaveBeenCalledWith(
      mockRegisterData,
      expectedConfig,
    );

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
    ).toMatchSnapshot('register legacy success payload');
  });

  it('should create the correct actions for when the unverified register legacy procedure is successful', async () => {
    (postUserLegacy as jest.Mock).mockResolvedValueOnce(
      mockUnverifiedUserLegacyResponse,
    );
    await registerLegacy(mockRegisterData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postUserLegacy).toHaveBeenCalledTimes(1);
    expect(postUserLegacy).toHaveBeenCalledWith(
      mockRegisterData,
      expectedConfig,
    );

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
    ).toMatchSnapshot('unverified register legacy success payload');
  });
});
