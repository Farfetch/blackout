import * as normalizr from 'normalizr';
import {
  expectedGetAddressesNormalizedPayload,
  mockGetAddressesResponse,
  userId,
} from 'tests/__fixtures__/addresses';
import { fetchAddresses } from '..';
import { getAddresses } from '@farfetch/blackout-client/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  getAddresses: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchAddresses() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the get addresses procedure fails', async () => {
    const expectedError = new Error('get adresses error');

    getAddresses.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchAddresses(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getAddresses).toHaveBeenCalledTimes(1);
      expect(getAddresses).toHaveBeenCalledWith({ userId }, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_ADDRESSES_REQUEST },
          {
            type: actionTypes.FETCH_ADDRESSES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address book procedure is successful', async () => {
    getAddresses.mockResolvedValueOnce(mockGetAddressesResponse);
    await store.dispatch(fetchAddresses(userId));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getAddresses).toHaveBeenCalledTimes(1);
    expect(getAddresses).toHaveBeenCalledWith({ userId }, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_ADDRESSES_REQUEST },
      {
        type: actionTypes.FETCH_ADDRESSES_SUCCESS,
        payload: expectedGetAddressesNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_ADDRESSES_SUCCESS,
      }),
    ).toMatchSnapshot('get addresses success payload');
  });
});
