import * as actionTypes from '../../actionTypes';
import { createPhoneTokenValidations } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { postPhoneTokenValidation } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPhoneTokenValidation: jest.fn(),
}));

describe('createPhoneTokenValidations action creator', () => {
  const params = { phoneNumber: '987654321', token: 'q1w2e3' };
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) =>
    mockStore({ users: INITIAL_STATE }, state);

  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create phone token validations procedure fails', async () => {
    const expectedError = new Error('create phone token validations error');

    (postPhoneTokenValidation as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(createPhoneTokenValidations(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPhoneTokenValidation).toHaveBeenCalledTimes(1);
      expect(postPhoneTokenValidation).toHaveBeenCalledWith(
        params,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_REQUEST },
          {
            type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create phone token validations procedure is successful', async () => {
    (postPhoneTokenValidation as jest.Mock).mockResolvedValueOnce({});
    await store.dispatch(createPhoneTokenValidations(params));

    const actionResults = store.getActions();

    expect(postPhoneTokenValidation).toHaveBeenCalledTimes(1);
    expect(postPhoneTokenValidation).toHaveBeenCalledWith(
      params,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_REQUEST },
      {
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_SUCCESS,
        payload: {},
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PHONE_TOKEN_VALIDATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('create phone token validations success payload');
  });
});
