import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { postPasswordReset } from '@farfetch/blackout-client';
import { resetPassword } from '../..';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPasswordReset: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('resetPassword() action creator', () => {
  const passwordResetData = {
    username: 'pepe@acme.com',
    token: '1293819283sdfs23',
    password: 'thisIsUserPassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the password resetting procedure fails', async () => {
    const expectedError = new Error('post password reset error');

    (postPasswordReset as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(resetPassword(passwordResetData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPasswordReset).toHaveBeenCalledTimes(1);
      expect(postPasswordReset).toHaveBeenCalledWith(
        passwordResetData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.PASSWORD_RESET_REQUEST },
          {
            type: actionTypes.PASSWORD_RESET_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the password resetting procedure is successful', async () => {
    (postPasswordReset as jest.Mock).mockResolvedValueOnce({});
    await store.dispatch(resetPassword(passwordResetData));

    const actionResults = store.getActions();

    expect(postPasswordReset).toHaveBeenCalledTimes(1);
    expect(postPasswordReset).toHaveBeenCalledWith(
      passwordResetData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.PASSWORD_RESET_REQUEST },
      {
        type: actionTypes.PASSWORD_RESET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PASSWORD_RESET_SUCCESS,
      }),
    ).toMatchSnapshot('password reset success payload');
  });
});
