import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  addressId2,
  expectedGetAddressNormalizedPayload,
  mockGetAddressResponse,
  userId,
} from 'tests/__fixtures__/users';
import { fetchUserAddress } from '..';
import { getUserAddress } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('fetchUserAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the get user address details procedure fails', async () => {
    const expectedError = new Error('get user address details error');

    (getUserAddress as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await fetchUserAddress(
      userId,
      addressId2,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getUserAddress).toHaveBeenCalledTimes(1);
      expect(getUserAddress).toHaveBeenCalledWith(
        { id: addressId2, userId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.FETCH_USER_ADDRESS_REQUEST,
          },
          {
            meta: { addressId: addressId2 },
            type: actionTypes.FETCH_USER_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the get user address details procedure is successful', async () => {
    (getUserAddress as jest.Mock).mockResolvedValueOnce(mockGetAddressResponse);
    await fetchUserAddress(userId, addressId2)(store.dispatch);

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserAddress).toHaveBeenCalledTimes(1);
    expect(getUserAddress).toHaveBeenCalledWith(
      { id: addressId2, userId },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_USER_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.FETCH_USER_ADDRESS_SUCCESS,
        payload: expectedGetAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get user address details success payload');
  });
});