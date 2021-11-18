import {
  expectedCreateContactNormalized,
  mockPostContactResponse,
} from '../../__fixtures__/contacts.fixtures';
import { mockStore } from '../../../../../tests';
import doCreateContact from '../doCreateContact';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doCreateContact action creator', () => {
  const postContact = jest.fn();
  const action = doCreateContact(postContact);
  const userId = 123456789;
  const data = {};
  const query = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the create contact procedure fails', async () => {
    const expectedError = new Error('post contact error');

    postContact.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, data, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postContact).toHaveBeenCalledTimes(1);
      expect(postContact).toHaveBeenCalledWith(
        userId,
        data,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_CONTACT_REQUEST },
          {
            type: actionTypes.CREATE_CONTACT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create contact procedure is successful', async () => {
    postContact.mockResolvedValueOnce(mockPostContactResponse);

    await store.dispatch(action(userId, data, query, expectedConfig));

    const actionResults = store.getActions();

    expect(postContact).toHaveBeenCalledTimes(1);
    expect(postContact).toHaveBeenCalledWith(
      userId,
      data,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_CONTACT_REQUEST },
      {
        type: actionTypes.CREATE_CONTACT_SUCCESS,
        payload: expectedCreateContactNormalized,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('create contact success payload');
  });
});
