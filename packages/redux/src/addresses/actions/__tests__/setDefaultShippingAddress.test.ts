import { actionTypes } from '../..';
import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putDefaultShippingAddress } from '@farfetch/blackout-client/addresses';
import { setDefaultShippingAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  putDefaultShippingAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('setDefaultShippingAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the set shipping address procedure fails', async () => {
    const expectedError = new Error('set default shipping address error');

    putDefaultShippingAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setDefaultShippingAddress(userId, addressId2));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putDefaultShippingAddress).toHaveBeenCalledTimes(1);
      expect(putDefaultShippingAddress).toHaveBeenCalledWith(
        { userId, id: addressId2 },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set shipping address procedure is successful', async () => {
    putDefaultShippingAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(setDefaultShippingAddress(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putDefaultShippingAddress).toHaveBeenCalledTimes(1);
    expect(putDefaultShippingAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('set default shipping address success payload');
  });
});
