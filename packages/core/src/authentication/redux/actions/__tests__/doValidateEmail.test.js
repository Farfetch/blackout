import { mockStore } from '../../../../../tests';
import doValidateEmail from '../doValidateEmail';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doValidateEmail() action creator', () => {
  const postValidateEmail = jest.fn();
  const action = doValidateEmail(postValidateEmail);

  const data = {
    userName: 'pepe@acme.com',
    password: '123465',
    rememberMe: true,
  };
  const validateData = {
    username: data.userName,
    token: 'TOKEN_01',
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

    postValidateEmail.mockRejectedValueOnce(errorObject);
    expect.assertions(4);

    try {
      await store.dispatch(action(validateData));
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
            payload: { error: errorObject },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the validate e-mail procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    postValidateEmail.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(validateData));

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
