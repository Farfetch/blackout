import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchContact } from '@farfetch/blackout-client/users';
import { updateContact } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  patchContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('doUpdateContact action creator', () => {
  const userId = 123456789;
  const contactId = 'abcdefghi';
  const data = {};
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update contact procedure fails', async () => {
    const expectedError = new Error('patch contact error');

    patchContact.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateContact(userId, contactId, data, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchContact).toHaveBeenCalledTimes(1);
      expect(patchContact).toHaveBeenCalledWith(
        userId,
        contactId,
        data,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_CONTACT_REQUEST },
          {
            type: actionTypes.UPDATE_CONTACT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update contact procedure is successful', async () => {
    patchContact.mockResolvedValueOnce();

    await store.dispatch(
      updateContact(userId, contactId, data, query, expectedConfig),
    );

    const actionResults = store.getActions();

    expect(patchContact).toHaveBeenCalledTimes(1);
    expect(patchContact).toHaveBeenCalledWith(
      userId,
      contactId,
      data,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_CONTACT_REQUEST },
      {
        type: actionTypes.UPDATE_CONTACT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('update contact success payload');
  });
});
