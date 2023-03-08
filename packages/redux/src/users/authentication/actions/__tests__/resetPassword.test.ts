import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { mockPasswordResetData } from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';
import { postPasswordReset } from '@farfetch/blackout-client';
import { resetPassword } from '../../index.js';
import reducer from '../../reducer.js';

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
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the password resetting procedure fails', async () => {
    const expectedError = new Error('post password reset error');

    (postPasswordReset as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await resetPassword(mockPasswordResetData)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postPasswordReset).toHaveBeenCalledTimes(1);
    expect(postPasswordReset).toHaveBeenCalledWith(
      mockPasswordResetData,
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
  });

  it('should create the correct actions for when the password resetting procedure is successful', async () => {
    (postPasswordReset as jest.Mock).mockResolvedValueOnce({});
    await resetPassword(mockPasswordResetData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postPasswordReset).toHaveBeenCalledTimes(1);
    expect(postPasswordReset).toHaveBeenCalledWith(
      mockPasswordResetData,
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
