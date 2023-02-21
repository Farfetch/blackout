import * as actionTypes from '../../actionTypes';
import {
  expectedGetContactsNormalized,
  mockGetContactsResponse,
  userId,
} from 'tests/__fixtures__/users';
import { fetchUserContacts } from '..';
import { getUserContacts } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserContacts: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchUserContacts() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user contacts procedure fails', async () => {
    const expectedError = new Error('get user contacts error');

    (getUserContacts as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserContacts(userId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserContacts).toHaveBeenCalledTimes(1);
    expect(getUserContacts).toHaveBeenCalledWith(userId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_CONTACTS_REQUEST },
        {
          type: actionTypes.FETCH_USER_CONTACTS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user contacts procedure is successful', async () => {
    (getUserContacts as jest.Mock).mockResolvedValueOnce(
      mockGetContactsResponse,
    );

    await fetchUserContacts(userId, expectedConfig)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserContacts).toHaveBeenCalledTimes(1);
    expect(getUserContacts).toHaveBeenCalledWith(userId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_CONTACTS_REQUEST },
      {
        payload: expectedGetContactsNormalized,
        type: actionTypes.FETCH_USER_CONTACTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_CONTACTS_SUCCESS,
      }),
    ).toMatchSnapshot('get user contacts success payload');
  });
});
