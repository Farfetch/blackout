import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import { patchUserContact } from '@farfetch/blackout-client';
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

describe('updateUserContact action creator', () => {
  const userId = 123456789;
  const contactId = 'abcdefghi';
  const data = {
    value: '',
    path: '',
    op: '',
    from: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update contact procedure fails', async () => {
    const expectedError = new Error('patch contact error');

    (patchUserContact as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateUserContact(userId, contactId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the update contact procedure is successful', async () => {
    (patchUserContact as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch(
      updateUserContact(userId, contactId, data, expectedConfig),
    );

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
    ).toMatchSnapshot('update contact success payload');
  });
});
