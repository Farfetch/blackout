import * as actionTypes from '../../actionTypes.js';
import { createAccountLink } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postAccountLink } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postAccountLink: jest.fn(),
}));

describe('createAccountLink action creator', () => {
  const params = { username: 'xxxx', password: 'q1w2e3' };
  const expectedConfig = undefined;
  const usersMockStore = (state = {}) =>
    mockStore({ users: INITIAL_STATE }, state);

  let store = usersMockStore();

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create account link procedure fails', async () => {
    const expectedError = new Error('create account link error');

    (postAccountLink as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await createAccountLink(params)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postAccountLink).toHaveBeenCalledTimes(1);
    expect(postAccountLink).toHaveBeenCalledWith(params, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_ACCOUNT_LINK_REQUEST },
        {
          type: actionTypes.CREATE_ACCOUNT_LINK_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create account link procedure is successful', async () => {
    (postAccountLink as jest.Mock).mockResolvedValueOnce({});
    await createAccountLink(params)(store.dispatch);

    const actionResults = store.getActions();

    expect(postAccountLink).toHaveBeenCalledTimes(1);
    expect(postAccountLink).toHaveBeenCalledWith(params, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_ACCOUNT_LINK_REQUEST },
      {
        type: actionTypes.CREATE_ACCOUNT_LINK_SUCCESS,
        payload: {},
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_ACCOUNT_LINK_SUCCESS,
      }),
    ).toMatchSnapshot('create account link success payload');
  });
});
