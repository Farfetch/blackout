import { actionTypes } from '../..';
import {
  expectedGetContactNormalized,
  mockGetContactResponse,
} from 'tests/__fixtures__/users';
import { fetchContact } from '..';
import { getUserContact } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getUserContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchContact action creator', () => {
  const userId = 123456789;
  const contactId = 'abcdefghi';

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get contact procedure fails', async () => {
    const expectedError = new Error('get contact error');

    (getUserContact as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchContact(userId, contactId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserContact).toHaveBeenCalledTimes(1);
      expect(getUserContact).toHaveBeenCalledWith(
        userId,
        contactId,
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
    (getUserContact as jest.Mock).mockResolvedValueOnce(mockGetContactResponse);

    await store.dispatch(fetchContact(userId, contactId, expectedConfig));

    const actionResults = store.getActions();

    expect(getUserContact).toHaveBeenCalledTimes(1);
    expect(getUserContact).toHaveBeenCalledWith(
      userId,
      contactId,
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
