import * as actionTypes from '../../actionTypes.js';
import { createPhoneTokenValidation } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postPhoneTokenValidation } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPhoneTokenValidation: jest.fn(),
}));

describe('createPhoneTokenValidation action creator', () => {
  const params = { phoneNumber: '987654321', token: 'q1w2e3' };
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) =>
    mockStore({ users: INITIAL_STATE }, state);

  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create phone token validation procedure fails', async () => {
    const expectedError = new Error('create phone token validation error');

    (postPhoneTokenValidation as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await createPhoneTokenValidation(params)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postPhoneTokenValidation).toHaveBeenCalledTimes(1);
    expect(postPhoneTokenValidation).toHaveBeenCalledWith(
      params,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_REQUEST },
        {
          type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create phone token validation procedure is successful', async () => {
    (postPhoneTokenValidation as jest.Mock).mockResolvedValueOnce({});
    await createPhoneTokenValidation(params)(store.dispatch);

    const actionResults = store.getActions();

    expect(postPhoneTokenValidation).toHaveBeenCalledTimes(1);
    expect(postPhoneTokenValidation).toHaveBeenCalledWith(
      params,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_REQUEST },
      {
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_SUCCESS,
        payload: {},
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATION_SUCCESS,
      }),
    ).toMatchSnapshot('create phone token validation success payload');
  });
});
