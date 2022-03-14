import { actionTypes } from '../..';
import { createContact } from '..';
import {
  expectedCreateContactNormalized,
  mockPostContactResponse,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { postContact } from '@farfetch/blackout-client/users';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  postContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('createContact action creator', () => {
  const userId = 123456789;
  const data = {
    id: 0,
    value: '',
    countryDetails: {
      countryCode: '',
      countryCallingCode: '',
    },
    type: '',
    description: '',
  };
  const query = { id: 0, body: data };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create contact procedure fails', async () => {
    const expectedError = new Error('post contact error');

    (postContact as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createContact(userId, data, query));
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
    (postContact as jest.Mock).mockResolvedValueOnce(mockPostContactResponse);

    await store.dispatch(createContact(userId, data, query, expectedConfig));

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
