import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { postValidateEmail, toBlackoutError } from '@farfetch/blackout-client';
import { validateEmail } from '../..';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postValidateEmail: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('validateEmailFactory() action creator', () => {
  const data = {
    userName: 'pepe@acme.com',
    password: '123465',
    rememberMe: true,
  };
  const validateData = {
    username: data.userName,
    token: 'TOKEN_EVA_01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the validate e-mail procedure fails', async () => {
    const errorObject = {
      errorMessage: 'post validate email error',
      errorCode: 0,
      status: 400,
    };

    (postValidateEmail as jest.Mock).mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(validateEmail(validateData));
    } catch (error) {
      expect(error).toBe(errorObject);
      expect(postValidateEmail).toHaveBeenCalledTimes(1);
      expect(postValidateEmail).toHaveBeenCalledWith(
        validateData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.VALIDATE_EMAIL_REQUEST },
          {
            type: actionTypes.VALIDATE_EMAIL_FAILURE,
            payload: { error: toBlackoutError(errorObject) },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the validate e-mail procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    (postValidateEmail as jest.Mock).mockResolvedValueOnce(mockResponse);
    await store.dispatch(validateEmail(validateData));

    const actionResults = store.getActions();

    expect(postValidateEmail).toHaveBeenCalledTimes(1);
    expect(postValidateEmail).toHaveBeenCalledWith(
      validateData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.VALIDATE_EMAIL_REQUEST },
      {
        type: actionTypes.VALIDATE_EMAIL_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.VALIDATE_EMAIL_SUCCESS,
      }),
    ).toMatchSnapshot('validate email success payload');
  });
});
