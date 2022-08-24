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
let store: ReturnType<typeof addressesMockStore>;

describe('setUserDefaultShippingAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the set user default shipping address procedure fails', async () => {
    const expectedError = new Error('set user default shipping address error');

    (putUserDefaultShippingAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    await setUserDefaultShippingAddress(
      userId,
      addressId2,
    )(store.dispatch).catch(error => {
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
    });
  });

  it('should create the correct actions for when the set user default shipping address procedure is successful', async () => {
    (putUserDefaultShippingAddress as jest.Mock).mockResolvedValueOnce(
      mockUpdateAddressResponse,
    );
    await setUserDefaultShippingAddress(userId, addressId2)(store.dispatch);

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
    ).toMatchSnapshot('set user default shipping address success payload');
  });
});
