import * as actionTypes from '../../actionTypes';
import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { putUserDefaultBillingAddress } from '@farfetch/blackout-client';
import { setUserDefaultBillingAddress } from '..';
import find from 'lodash/find';

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
    expect.assertions(4);

    await setUserDefaultBillingAddress(
      userId,
      addressId2,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the set user deafult billing address procedure is successful', async () => {
    (putUserDefaultBillingAddress as jest.Mock).mockResolvedValueOnce(
      mockUpdateAddressResponse,
    );
    await setUserDefaultBillingAddress(userId, addressId2)(store.dispatch);

    const actionResults = store.getActions();

    expect.assertions(4);
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
