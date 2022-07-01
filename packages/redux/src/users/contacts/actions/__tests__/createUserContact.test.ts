import * as actionTypes from '../../actionTypes';
import { createUserContact } from '..';
import {
  expectedCreateContactNormalized,
  mockPostContactResponse,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import { postUserContact } from '@farfetch/blackout-client';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postUserContact: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('createUserContact action creator', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create contact procedure fails', async () => {
    const expectedError = new Error('post contact error');

    (postUserContact as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createUserContact(userId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postUserContact).toHaveBeenCalledTimes(1);
      expect(postUserContact).toHaveBeenCalledWith(
        userId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_USER_CONTACT_REQUEST },
          {
            type: actionTypes.CREATE_USER_CONTACT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create contact procedure is successful', async () => {
    (postUserContact as jest.Mock).mockResolvedValueOnce(
      mockPostContactResponse,
    );

    await store.dispatch(createUserContact(userId, data, expectedConfig));

    const actionResults = store.getActions();

    expect(postUserContact).toHaveBeenCalledTimes(1);
    expect(postUserContact).toHaveBeenCalledWith(userId, data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_USER_CONTACT_REQUEST },
      {
        type: actionTypes.CREATE_USER_CONTACT_SUCCESS,
        payload: expectedCreateContactNormalized,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_USER_CONTACT_SUCCESS,
      }),
    ).toMatchSnapshot('create contact success payload');
  });
});
