import { actionTypes } from '../..';
import {
  expectedGetContactsNormalized,
  mockGetContactsResponse,
} from '../../__fixtures__/contacts.fixtures';
import { fetchContacts } from '..';
import { getContacts } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getContacts: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchContacts action creator', () => {
  const userId = 123456789;
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user contacts procedure fails', async () => {
    const expectedError = new Error('get contacts error');

    getContacts.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchContacts(userId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getContacts).toHaveBeenCalledTimes(1);
      expect(getContacts).toHaveBeenCalledWith(userId, query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CONTACTS_REQUEST },
          {
            type: actionTypes.FETCH_CONTACTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get user contacts procedure is successful', async () => {
    getContacts.mockResolvedValueOnce(mockGetContactsResponse);

    await store.dispatch(fetchContacts(userId, query, expectedConfig));

    const actionResults = store.getActions();

    expect(getContacts).toHaveBeenCalledTimes(1);
    expect(getContacts).toHaveBeenCalledWith(userId, query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CONTACTS_REQUEST },
      {
        payload: expectedGetContactsNormalized,
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
      }),
    ).toMatchSnapshot('get contact success payload');
  });
});
