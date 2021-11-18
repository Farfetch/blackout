import {
  addressId2,
  expectedGetAddressNormalizedPayload,
  mockGetAddressResponse,
  userId,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doGetAddress from '../doGetAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetAddress() action creator', () => {
  const getAddress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the get address details procedure fails', async () => {
    const action = doGetAddress(getAddress);
    const expectedError = new Error('get address details error');

    getAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(addressId2));
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
            type: actionTypes.GET_ADDRESS_REQUEST,
          },
          {
            meta: { addressId: addressId2 },
            type: actionTypes.GET_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    const action = doGetAddress(getAddress);

    getAddress.mockResolvedValueOnce(mockGetAddressResponse);
    await store.dispatch(action(addressId2));

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
        type: actionTypes.GET_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.GET_ADDRESS_SUCCESS,
        payload: expectedGetAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get address details success payload');
  });
});
