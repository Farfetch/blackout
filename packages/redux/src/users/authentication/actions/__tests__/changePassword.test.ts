import * as actionTypes from '../../actionTypes';
import { changePassword } from '../..';
import { mockPasswordChangeData } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { postPasswordChange } from '@farfetch/blackout-client';
import find from 'lodash/find';
import reducer from '../../reducer';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPasswordChange: jest.fn(),
}));

const mockAction = { type: 'this_is_a_mock_action' };

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer(undefined, mockAction) }, state);

const expectedConfig = undefined;
let store = authenticationMockStore();

describe('changePassword() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions for when the password changing procedure fails', async () => {
    const expectedError = new Error('post password change error');

    (postPasswordChange as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await changePassword(mockPasswordChangeData)(store.dispatch).catch(
      error => {
        expect(error).toBe(expectedError);
        expect(postPasswordChange).toHaveBeenCalledTimes(1);
        expect(postPasswordChange).toHaveBeenCalledWith(
          mockPasswordChangeData,
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
      },
    );
  });

  it('should create the correct actions for when the password changing procedure is successful', async () => {
    (postPasswordChange as jest.Mock).mockResolvedValueOnce({});
    await changePassword(mockPasswordChangeData)(store.dispatch);

    const actionResults = store.getActions();

    expect(postPasswordChange).toHaveBeenCalledTimes(1);
    expect(postPasswordChange).toHaveBeenCalledWith(
      mockPasswordChangeData,
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
