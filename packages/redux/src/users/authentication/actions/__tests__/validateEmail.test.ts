import * as actionTypes from '../../actionTypes';
import { mockErrorObject, mockLoginData } from 'tests/__fixtures__/users';
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

describe('validateEmail() action creator', () => {
  const validateData = {
    username: mockLoginData.username,
    token: 'TOKEN_EVA_01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the validate e-mail procedure fails', async () => {
    (postValidateEmail as jest.Mock).mockRejectedValueOnce(mockErrorObject);
    expect.assertions(4);

    await validateEmail(validateData)(store.dispatch).catch(error => {
      expect(error).toBe(mockErrorObject);
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
            payload: { error: toBlackoutError(mockErrorObject) },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the validate e-mail procedure is successful', async () => {
    const mockResponse = {
      status: 204,
    };

    (postValidateEmail as jest.Mock).mockResolvedValueOnce(mockResponse);
    await validateEmail(validateData)(store.dispatch);

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
