import * as actionTypes from '../../actionTypes';
import { createPhoneTokens } from '..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { postPhoneToken } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postPhoneToken: jest.fn(),
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

    (postPhoneToken as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createPhoneTokens(params));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPhoneToken).toHaveBeenCalledTimes(1);
      expect(postPhoneToken).toHaveBeenCalledWith(params, expectedConfig);
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
    (postPhoneToken as jest.Mock).mockResolvedValueOnce({});
    await store.dispatch(createPhoneTokens(params));

    const actionResults = store.getActions();

    expect(postPhoneToken).toHaveBeenCalledTimes(1);
    expect(postPhoneToken).toHaveBeenCalledWith(params, expectedConfig);

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
