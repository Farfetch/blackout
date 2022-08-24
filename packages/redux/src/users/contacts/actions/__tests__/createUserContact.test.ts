import * as actionTypes from '../../actionTypes';
import { createUserContact } from '..';
import {
  expectedCreateContactNormalized,
  mockGetContactResponse,
  mockPostContactResponse,
  userId,
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

describe('createUserContact() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the create user contact procedure fails', async () => {
    const expectedError = new Error('post user contact error');

    (postUserContact as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await createUserContact(
      userId,
      mockGetContactResponse,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(postUserContact).toHaveBeenCalledTimes(1);
      expect(postUserContact).toHaveBeenCalledWith(
        userId,
        mockGetContactResponse,
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
    });
  });

  it('should create the correct actions for when the create user contact procedure is successful', async () => {
    (postUserContact as jest.Mock).mockResolvedValueOnce(
      mockPostContactResponse,
    );

    await createUserContact(
      userId,
      mockGetContactResponse,
      expectedConfig,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(postUserContact).toHaveBeenCalledTimes(1);
    expect(postUserContact).toHaveBeenCalledWith(
      userId,
      mockGetContactResponse,
      expectedConfig,
    );
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
    ).toMatchSnapshot('create user contact success payload');
  });
});
