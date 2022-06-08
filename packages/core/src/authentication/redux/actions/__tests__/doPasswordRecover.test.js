import { mockStore } from '../../../../../tests';
import doPasswordRecover from '../doPasswordRecover';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPasswordRecover() action creator', () => {
  const postPasswordRecover = jest.fn();
  const action = doPasswordRecover(postPasswordRecover);
  const passwordRecoverData = {
    username: 'pepe@acme.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the password recovering procedure fails', async () => {
    const expectedError = new Error('post password recover error');

    postPasswordRecover.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(passwordRecoverData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPasswordRecover).toHaveBeenCalledTimes(1);
      expect(postPasswordRecover).toHaveBeenCalledWith(
        passwordRecoverData,
        undefined,
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
    }
  });

  it('should create the correct actions for when the password recovering procedure is successful', async () => {
    postPasswordRecover.mockResolvedValueOnce({});
    await store.dispatch(action(passwordRecoverData));

    const actionResults = store.getActions();

    expect(postPasswordRecover).toHaveBeenCalledTimes(1);
    expect(postPasswordRecover).toHaveBeenCalledWith(
      passwordRecoverData,
      undefined,
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
