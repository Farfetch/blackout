import { actionTypes } from '../..';
import { createPhoneNumberValidations } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postPhoneNumberValidations } from '@farfetch/blackout-client/users';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  postPhoneNumberValidations: jest.fn(),
}));

describe('createPhoneNumberValidations action creator', () => {
  const params = { phoneNumber: '987654321', token: 'q1w2e3' };
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) =>
    mockStore({ users: INITIAL_STATE }, state);

  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create phone number  validations procedure fails', async () => {
    const expectedError = new Error('create phone number  validations error');

    (postPhoneNumberValidations as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(createPhoneNumberValidations(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPhoneNumberValidations).toHaveBeenCalledTimes(1);
      expect(postPhoneNumberValidations).toHaveBeenCalledWith(
        params,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_REQUEST },
          {
            type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create phone number  validations procedure is successful', async () => {
    (postPhoneNumberValidations as jest.Mock).mockResolvedValueOnce({});
    await store.dispatch(createPhoneNumberValidations(params));

    const actionResults = store.getActions();

    expect(postPhoneNumberValidations).toHaveBeenCalledTimes(1);
    expect(postPhoneNumberValidations).toHaveBeenCalledWith(
      params,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_REQUEST },
      {
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_SUCCESS,
        payload: {},
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PHONE_NUMBER_VALIDATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('create phone number  validations success payload');
  });
});
