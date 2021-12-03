import { actionTypes } from '../..';
import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putDefaultBillingAddress } from '@farfetch/blackout-client/addresses';
import { setDefaultBillingAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  putDefaultBillingAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('setDefaultBillingAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the set billing address procedure fails', async () => {
    const expectedError = new Error('set default billing address error');

    putDefaultBillingAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setDefaultBillingAddress(userId, addressId2));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putDefaultBillingAddress).toHaveBeenCalledTimes(1);
      expect(putDefaultBillingAddress).toHaveBeenCalledWith(
        { userId, id: addressId2 },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.SET_DEFAULT_BILLING_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set billing address procedure is successful', async () => {
    putDefaultBillingAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(setDefaultBillingAddress(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putDefaultBillingAddress).toHaveBeenCalledTimes(1);
    expect(putDefaultBillingAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_DEFAULT_BILLING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_DEFAULT_BILLING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('set default billing address success payload');
  });
});
