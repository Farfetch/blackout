import * as normalizr from 'normalizr';
import {
  addressId2,
  expectedGetAddressNormalizedPayload,
  mockGetAddressResponse,
  userId,
} from 'tests/__fixtures__/addresses';
import { fetchAddress } from '..';
import { getAddress } from '@farfetch/blackout-client/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  getAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the get address details procedure fails', async () => {
    const expectedError = new Error('get address details error');

    getAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchAddress(userId, addressId2));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getAddress).toHaveBeenCalledTimes(1);
      expect(getAddress).toHaveBeenCalledWith(
        { id: addressId2, userId },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.FETCH_ADDRESS_REQUEST,
          },
          {
            meta: { addressId: addressId2 },
            type: actionTypes.FETCH_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    getAddress.mockResolvedValueOnce(mockGetAddressResponse);
    await store.dispatch(fetchAddress(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getAddress).toHaveBeenCalledTimes(1);
    expect(getAddress).toHaveBeenCalledWith(
      { id: addressId2, userId },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.FETCH_ADDRESS_SUCCESS,
        payload: expectedGetAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get address details success payload');
  });
});
