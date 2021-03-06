import { mockStore } from '../../../../../tests';
import doDeleteContact from '../doDeleteContact';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doDeleteContact action creator', () => {
  const deleteContact = jest.fn();
  const action = doDeleteContact(deleteContact);
  const userId = 123456789;
  const contactId = 'abcdefghi';
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the get contact procedure fails', async () => {
    const expectedError = new Error('get contact error');

    deleteContact.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, contactId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteContact).toHaveBeenCalledTimes(1);
      expect(deleteContact).toHaveBeenCalledWith(
        userId,
        contactId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.DELETE_CONTACT_REQUEST },
          {
            type: actionTypes.DELETE_CONTACT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get contact procedure is successful', async () => {
    deleteContact.mockResolvedValueOnce();

    await store.dispatch(action(userId, contactId, query, expectedConfig));

    const actionResults = store.getActions();

    expect(deleteContact).toHaveBeenCalledTimes(1);
    expect(deleteContact).toHaveBeenCalledWith(
      userId,
      contactId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.DELETE_CONTACT_REQUEST },
      {
        type: actionTypes.DELETE_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('get contact success payload');
  });
});
