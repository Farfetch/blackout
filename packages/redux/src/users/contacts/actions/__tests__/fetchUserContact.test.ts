import * as actionTypes from '../../actionTypes';
import {
  contactId,
  expectedGetContactNormalized,
  mockGetContactResponse,
  userId,
} from 'tests/__fixtures__/users';
import { fetchUserContact } from '..';
import { getUserContact } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchUserContact() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user contact procedure fails', async () => {
    const expectedError = new Error('get user contact error');

    (getUserContact as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await fetchUserContact(
      userId,
      contactId,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getUserContact).toHaveBeenCalledTimes(1);
      expect(getUserContact).toHaveBeenCalledWith(
        userId,
        contactId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_USER_CONTACT_REQUEST },
          {
            type: actionTypes.FETCH_USER_CONTACT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the get user contact procedure is successful', async () => {
    (getUserContact as jest.Mock).mockResolvedValueOnce(mockGetContactResponse);

    await fetchUserContact(userId, contactId, expectedConfig)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserContact).toHaveBeenCalledTimes(1);
    expect(getUserContact).toHaveBeenCalledWith(
      userId,
      contactId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_CONTACT_REQUEST },
      {
        payload: expectedGetContactNormalized,
        type: actionTypes.FETCH_USER_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('get user contact success payload');
  });
});
