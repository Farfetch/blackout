import { mockStore } from '../../../../../tests';
import doPasswordReset from '../doPasswordReset';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPasswordReset() action creator', () => {
  const postPasswordReset = jest.fn();
  const action = doPasswordReset(postPasswordReset);
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

    postPasswordReset.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(passwordResetData));
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
    postPasswordReset.mockResolvedValueOnce({});
    await store.dispatch(action(passwordResetData));

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
