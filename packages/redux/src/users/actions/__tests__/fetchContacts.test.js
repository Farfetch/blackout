import {
  expectedGetContactsNormalized,
  mockGetContactsResponse,
} from '../../__fixtures__/contacts.fixtures';
import { fetchContacts } from '..';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);
const expectedConfig = undefined;
let store;

describe('fetchContacts action creator', () => {
  const getContacts = jest.fn();
  const action = fetchContacts(getContacts);
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
      await store.dispatch(action(userId, query));
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

    await store.dispatch(action(userId, query, expectedConfig));

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
