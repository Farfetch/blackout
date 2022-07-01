import * as actionTypes from '../../actionTypes';
import { fetchUserDefaultContactAddress } from '..';
import { getUserDefaultContactAddress } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockGetAddressResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchUserDefaultContactAddress() action creator', () => {
  const userId = 123456;

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get default contact address details procedure fails', async () => {
    const expectedError = new Error('get default contact address error');

    getUserDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchUserDefaultContactAddress(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserDefaultContactAddress).toHaveBeenCalledTimes(1);
      expect(getUserDefaultContactAddress).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    const expectedResponse = { ...mockGetAddressResponse };

    getUserDefaultContactAddress.mockResolvedValueOnce(mockGetAddressResponse);
    await store.dispatch(fetchUserDefaultContactAddress(userId));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(getUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
        payload: expectedResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get default contact address success payload');
  });
});
