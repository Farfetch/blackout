import * as actionTypes from '../../actionTypes';
import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { putUserDefaultShippingAddress } from '@farfetch/blackout-client';
import { setUserDefaultShippingAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserDefaultShippingAddress: jest.fn(),
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

    putUserDefaultShippingAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setUserDefaultShippingAddress(userId, addressId2));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putUserDefaultShippingAddress).toHaveBeenCalledTimes(1);
      expect(putUserDefaultShippingAddress).toHaveBeenCalledWith(
        { userId, id: addressId2 },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set shipping address procedure is successful', async () => {
    putUserDefaultShippingAddress.mockResolvedValueOnce(
      mockUpdateAddressResponse,
    );
    await store.dispatch(setUserDefaultShippingAddress(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putUserDefaultShippingAddress).toHaveBeenCalledTimes(1);
    expect(putUserDefaultShippingAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('set default shipping address success payload');
  });
});
