import {
  expectedGetContactNormalized,
  mockGetContactResponse,
} from '../../__fixtures__/contacts.fixtures';
import { fetchContact } from '..';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);
const expectedConfig = undefined;
let store;

describe('fetchContact action creator', () => {
  const getContact = jest.fn();
  const action = fetchContact(getContact);
  const userId = 123456789;
  const contactId = 'abcdefghi';
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get contact procedure fails', async () => {
    const expectedError = new Error('get contact error');

    getContact.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, contactId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getContact).toHaveBeenCalledTimes(1);
      expect(getContact).toHaveBeenCalledWith(
        userId,
        contactId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CONTACT_REQUEST },
          {
            type: actionTypes.FETCH_CONTACT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get contact procedure is successful', async () => {
    getContact.mockResolvedValueOnce(mockGetContactResponse);

    await store.dispatch(action(userId, contactId, query, expectedConfig));

    const actionResults = store.getActions();

    expect(getContact).toHaveBeenCalledTimes(1);
    expect(getContact).toHaveBeenCalledWith(
      userId,
      contactId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CONTACT_REQUEST },
      {
        payload: expectedGetContactNormalized,
        type: actionTypes.FETCH_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('get contact success payload');
  });
});
