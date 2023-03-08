import * as actionTypes from '../../actionTypes.js';
import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { putUserDefaultBillingAddress } from '@farfetch/blackout-client';
import { setUserDefaultBillingAddress } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserDefaultBillingAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('setUserDefaultBillingAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the set user default billing address procedure fails', async () => {
    const expectedError = new Error('set user default billing address error');

    (putUserDefaultBillingAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await setUserDefaultBillingAddress(userId, addressId2)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(putUserDefaultBillingAddress).toHaveBeenCalledTimes(1);
    expect(putUserDefaultBillingAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { addressId: addressId2 },
          type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
          payload: { error: expectedError },
          meta: { addressId: addressId2 },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set user deafult billing address procedure is successful', async () => {
    (putUserDefaultBillingAddress as jest.Mock).mockResolvedValueOnce(
      mockUpdateAddressResponse,
    );
    await setUserDefaultBillingAddress(userId, addressId2)(store.dispatch);

    const actionResults = store.getActions();

    expect(putUserDefaultBillingAddress).toHaveBeenCalledTimes(1);
    expect(putUserDefaultBillingAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('set user default billing address success payload');
  });
});
