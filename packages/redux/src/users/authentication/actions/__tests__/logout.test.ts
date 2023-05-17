import * as actionTypes from '../../actionTypes.js';
import { find } from 'lodash-es';
import { logout } from '../../index.js';
import { mockStore } from '../../../../../tests/index.js';
import { postLogout } from '@farfetch/blackout-client';
import reducer from '../../reducer.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postLogout: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('logout() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the logout procedure fails', async () => {
    const expectedError = new Error('post logout error');

    (postLogout as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(async () => await logout()(store.dispatch)).rejects.toThrow(
      expectedError,
    );

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
  });

  it('should create the correct actions for when the logout procedure is successful', async () => {
    (postLogout as jest.Mock).mockResolvedValueOnce({});
    await logout()(store.dispatch);

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
