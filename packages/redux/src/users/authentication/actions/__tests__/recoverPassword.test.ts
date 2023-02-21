import * as actionTypes from '../../actionTypes';
import { mockPasswordRecoverData } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { postPasswordRecover } from '@farfetch/blackout-client';
import { recoverPassword } from '../..';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPasswordRecover: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('recoverPassword() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the password recovering procedure fails', async () => {
    const expectedError = new Error('post password recover error');

    (postPasswordRecover as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await recoverPassword(mockPasswordRecoverData)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postPasswordRecover).toHaveBeenCalledTimes(1);
    expect(postPasswordRecover).toHaveBeenCalledWith(
      mockPasswordRecoverData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.PASSWORD_RECOVER_REQUEST },
        {
          type: actionTypes.PASSWORD_RECOVER_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the password recovering procedure is successful', async () => {
    (postPasswordRecover as jest.Mock).mockResolvedValueOnce({});
    await recoverPassword(mockPasswordRecoverData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postPasswordRecover).toHaveBeenCalledTimes(1);
    expect(postPasswordRecover).toHaveBeenCalledWith(
      mockPasswordRecoverData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.PASSWORD_RECOVER_REQUEST },
      {
        type: actionTypes.PASSWORD_RECOVER_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PASSWORD_RECOVER_SUCCESS,
      }),
    ).toMatchSnapshot('password recover success payload');
  });
});
