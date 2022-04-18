import { actionTypes } from '../..';
import { createPhoneTokens } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postPhoneTokens } from '@farfetch/blackout-client/users';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  postPhoneTokens: jest.fn(),
}));

describe('createPhoneTokens action creator', () => {
  const params = { phoneNumber: '987654321' };
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) =>
    mockStore({ users: INITIAL_STATE }, state);

  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create phone token procedure fails', async () => {
    const expectedError = new Error('create phone token error');

    (postPhoneTokens as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createPhoneTokens(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPhoneTokens).toHaveBeenCalledTimes(1);
      expect(postPhoneTokens).toHaveBeenCalledWith(params, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_PHONE_TOKEN_REQUEST },
          {
            type: actionTypes.CREATE_PHONE_TOKEN_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create phone token procedure is successful', async () => {
    (postPhoneTokens as jest.Mock).mockResolvedValueOnce({});
    await store.dispatch(createPhoneTokens(params));

    const actionResults = store.getActions();

    expect(postPhoneTokens).toHaveBeenCalledTimes(1);
    expect(postPhoneTokens).toHaveBeenCalledWith(params, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_PHONE_TOKEN_REQUEST },
      {
        type: actionTypes.CREATE_PHONE_TOKEN_SUCCESS,
        payload: {},
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_PHONE_TOKEN_SUCCESS,
      }),
    ).toMatchSnapshot('create phone token success payload');
  });
});
