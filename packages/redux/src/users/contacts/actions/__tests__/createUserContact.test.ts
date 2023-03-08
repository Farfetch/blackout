import * as actionTypes from '../../actionTypes.js';
import { createUserContact } from '../index.js';
import {
  expectedCreateContactNormalized,
  mockGetContactResponse,
  mockPostContactResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { postUserContact } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('createUserContact() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user contact procedure fails', async () => {
    const expectedError = new Error('post user contact error');

    (postUserContact as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await createUserContact(userId, mockGetContactResponse)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postUserContact).toHaveBeenCalledTimes(1);
    expect(postUserContact).toHaveBeenCalledWith(
      userId,
      mockGetContactResponse,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_USER_CONTACT_REQUEST },
        {
          type: actionTypes.CREATE_USER_CONTACT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create user contact procedure is successful', async () => {
    (postUserContact as jest.Mock).mockResolvedValueOnce(
      mockPostContactResponse,
    );

    await createUserContact(
      userId,
      mockGetContactResponse,
      expectedConfig,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postUserContact).toHaveBeenCalledTimes(1);
    expect(postUserContact).toHaveBeenCalledWith(
      userId,
      mockGetContactResponse,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_CONTACT_REQUEST },
      {
        type: actionTypes.CREATE_USER_CONTACT_SUCCESS,
        payload: expectedCreateContactNormalized,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('create user contact success payload');
  });
});
