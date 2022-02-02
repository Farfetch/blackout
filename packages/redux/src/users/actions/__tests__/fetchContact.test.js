import { actionTypes } from '../..';
import {
  expectedGetContactNormalized,
  mockGetContactResponse,
} from 'tests/__fixtures__/users';
import { fetchContact } from '..';
import { getContact } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchContact action creator', () => {
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
      await store.dispatch(fetchContact(userId, contactId, query));
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

    await store.dispatch(
      fetchContact(userId, contactId, query, expectedConfig),
    );

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
