import * as actionTypes from '../../actionTypes';
import { contactId, userId } from 'tests/__fixtures__/users';
import { deleteUserContact } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import { removeUserContact } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('removeUserContact() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user contact procedure fails', async () => {
    const expectedError = new Error('get user contact error');

    (deleteUserContact as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await removeUserContact(userId, contactId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteUserContact).toHaveBeenCalledTimes(1);
    expect(deleteUserContact).toHaveBeenCalledWith(
      userId,
      contactId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.REMOVE_USER_CONTACT_REQUEST },
        {
          type: actionTypes.REMOVE_USER_CONTACT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user contact procedure is successful', async () => {
    (deleteUserContact as jest.Mock).mockResolvedValueOnce({});

    await removeUserContact(userId, contactId, expectedConfig)(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteUserContact).toHaveBeenCalledTimes(1);
    expect(deleteUserContact).toHaveBeenCalledWith(
      userId,
      contactId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.REMOVE_USER_CONTACT_REQUEST },
      {
        type: actionTypes.REMOVE_USER_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('remove user contact success payload');
  });
});
