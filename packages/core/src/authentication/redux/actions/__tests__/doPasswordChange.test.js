import { mockStore } from '../../../../../tests';
import doPasswordChange from '../doPasswordChange';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPasswordChange() action creator', () => {
  const postPasswordChange = jest.fn();
  const action = doPasswordChange(postPasswordChange);
  const passwordChangeData = {
    oldPassword: 'thisisOLDpassword',
    newPassword: 'thisisNEWpassword',
    userId: 0,
    username: 'pepe',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the password changing procedure fails', async () => {
    const expectedError = new Error('post password change error');

    postPasswordChange.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(passwordChangeData));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPasswordChange).toHaveBeenCalledTimes(1);
      expect(postPasswordChange).toHaveBeenCalledWith(
        passwordChangeData,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.PASSWORD_CHANGE_REQUEST },
          {
            type: actionTypes.PASSWORD_CHANGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the password changing procedure is successful', async () => {
    postPasswordChange.mockResolvedValueOnce({});
    await store.dispatch(action(passwordChangeData));

    const actionResults = store.getActions();

    expect(postPasswordChange).toHaveBeenCalledTimes(1);
    expect(postPasswordChange).toHaveBeenCalledWith(
      passwordChangeData,
      expectedConfig,
    );

    expect(actionResults).toMatchObject([
      { type: actionTypes.PASSWORD_CHANGE_REQUEST },
      {
        type: actionTypes.PASSWORD_CHANGE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PASSWORD_CHANGE_SUCCESS,
      }),
    ).toMatchSnapshot('password change success payload');
  });
});
