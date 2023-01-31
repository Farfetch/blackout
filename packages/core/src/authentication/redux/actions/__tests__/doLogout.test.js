import { mockStore } from '../../../../../tests';
import doLogout from '../doLogout';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doLogout() action creator', () => {
  const postLogout = jest.fn();
  const action = doLogout(postLogout);

  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the logout procedure fails', async () => {
    const expectedError = new Error('post logout error');

    postLogout.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action());
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postLogout).toHaveBeenCalledTimes(1);
      expect(postLogout).toHaveBeenCalledWith(expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.LOGOUT_REQUEST },
          {
            type: actionTypes.LOGOUT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the logout procedure is successful', async () => {
    postLogout.mockResolvedValueOnce({});
    await store.dispatch(action());

    const actionResults = store.getActions();

    expect(postLogout).toHaveBeenCalledTimes(1);
    expect(postLogout).toHaveBeenCalledWith(expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.LOGOUT_REQUEST },
      {
        type: actionTypes.LOGOUT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.LOGOUT_SUCCESS,
      }),
    ).toMatchSnapshot('logout success payload');
  });
});
