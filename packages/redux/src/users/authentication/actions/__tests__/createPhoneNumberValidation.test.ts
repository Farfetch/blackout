import * as actionTypes from '../../actionTypes.js';
import { createPhoneNumberValidation } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postPhoneNumberValidation } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPhoneNumberValidation: jest.fn(),
}));

describe('createPhoneNumberValidation action creator', () => {
  const params = { phoneNumber: '987654321', token: 'q1w2e3' };
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) =>
    mockStore({ users: INITIAL_STATE }, state);

  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create phone number validation procedure fails', async () => {
    const expectedError = new Error('create phone number validation error');

    (postPhoneNumberValidation as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await createPhoneNumberValidation(params)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postPhoneNumberValidation).toHaveBeenCalledTimes(1);
    expect(postPhoneNumberValidation).toHaveBeenCalledWith(
      params,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_REQUEST },
        {
          type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create phone number validation procedure is successful', async () => {
    (postPhoneNumberValidation as jest.Mock).mockResolvedValueOnce({});
    await createPhoneNumberValidation(params)(store.dispatch);

    const actionResults = store.getActions();

    expect(postPhoneNumberValidation).toHaveBeenCalledTimes(1);
    expect(postPhoneNumberValidation).toHaveBeenCalledWith(
      params,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_REQUEST },
      {
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_SUCCESS,
        payload: {},
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATION_SUCCESS,
      }),
    ).toMatchSnapshot('create phone number validation success payload');
  });
});
