import { actionTypes } from '../..';
import { deleteContact } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { removeContact } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  deleteContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('removeContact action creator', () => {
  const userId = 123456789;
  const contactId = 'abcdefghi';
  const query = {
    id: userId,
    contactId,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get contact procedure fails', async () => {
    const expectedError = new Error('get contact error');

    (deleteContact as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removeContact(userId, contactId, query));
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
          { type: actionTypes.REMOVE_CONTACT_REQUEST },
          {
            type: actionTypes.REMOVE_CONTACT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get contact procedure is successful', async () => {
    (deleteContact as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch(
      removeContact(userId, contactId, query, expectedConfig),
    );

    const actionResults = store.getActions();

    expect(deleteContact).toHaveBeenCalledTimes(1);
    expect(deleteContact).toHaveBeenCalledWith(
      userId,
      contactId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_CONTACT_REQUEST },
      {
        type: actionTypes.REMOVE_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('get contact success payload');
  });
});
