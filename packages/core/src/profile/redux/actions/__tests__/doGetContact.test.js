import {
  expectedGetContactNormalized,
  mockGetContactResponse,
} from '../../__fixtures__/contacts.fixtures';
import { mockStore } from '../../../../../tests';
import doGetContact from '../doGetContact';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetContact action creator', () => {
  const getContact = jest.fn();
  const action = doGetContact(getContact);
  const userId = 123456789;
  const contactId = 'abcdefghi';
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
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
          { type: actionTypes.GET_CONTACT_REQUEST },
          {
            type: actionTypes.GET_CONTACT_FAILURE,
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
      { type: actionTypes.GET_CONTACT_REQUEST },
      {
        payload: expectedGetContactNormalized,
        type: actionTypes.GET_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('get contact success payload');
  });
});
