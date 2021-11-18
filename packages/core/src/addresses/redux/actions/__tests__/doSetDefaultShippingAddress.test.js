import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doSetDefaultShippingAddress from '../doSetDefaultShippingAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doSetDefaultShippingAddress() action creator', () => {
  const putDefaultShippingAddress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the set shipping address procedure fails', async () => {
    const action = doSetDefaultShippingAddress(putDefaultShippingAddress);
    const expectedError = new Error('set default shipping address error');

    putDefaultShippingAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(addressId2));
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
    const action = doSetDefaultShippingAddress(putDefaultShippingAddress);
    putDefaultShippingAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(action(addressId2));

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
