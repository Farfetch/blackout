import * as actionTypes from '../../actionTypes';
import { contactId, userId } from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import {
  patchUserContact,
  type PatchUserContactOperation,
} from '@farfetch/blackout-client';
import { updateUserContact } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchUserContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('updateUserContact() action creator', () => {
  const data: PatchUserContactOperation[] = [
    {
      value: '',
      path: '',
      op: 'add',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update user contact procedure fails', async () => {
    const expectedError = new Error('patch user contact error');

    (patchUserContact as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateUserContact(userId, contactId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchUserContact).toHaveBeenCalledTimes(1);
    expect(patchUserContact).toHaveBeenCalledWith(
      userId,
      contactId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.UPDATE_USER_CONTACT_REQUEST },
        {
          type: actionTypes.UPDATE_USER_CONTACT_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the update user contact procedure is successful', async () => {
    (patchUserContact as jest.Mock).mockResolvedValueOnce({});

    await updateUserContact(
      userId,
      contactId,
      data,
      expectedConfig,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(patchUserContact).toHaveBeenCalledTimes(1);
    expect(patchUserContact).toHaveBeenCalledWith(
      userId,
      contactId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_USER_CONTACT_REQUEST },
      {
        type: actionTypes.UPDATE_USER_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('update user contact success payload');
  });
});
