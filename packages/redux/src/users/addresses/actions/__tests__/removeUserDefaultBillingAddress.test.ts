import * as actionTypes from '../../actionTypes.js';
import { addressId2, userId } from 'tests/__fixtures__/users/index.mjs';
import { deleteUserDefaultBillingAddress } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserDefaultBillingAddress } from '../index.js';
import type { StoreState } from '../../../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserDefaultBillingAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore(
    {
      addresses: INITIAL_STATE,
      entities: {
        addresses: {
          [addressId2]: {
            id: addressId2,
            isCurrentBilling: true,
          },
        },
      },
    },
    state,
  );

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('removeUserDefaultBillingAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the delete user default billing address procedure fails', async () => {
    const expectedError = new Error(
      'delete user default billing address error',
    );

    (deleteUserDefaultBillingAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removeUserDefaultBillingAddress(userId)(
          store.dispatch,
          store.getState as () => StoreState,
        ),
    ).rejects.toThrow(expectedError);

    expect(deleteUserDefaultBillingAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserDefaultBillingAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { userId, addressId: addressId2 },
          type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_FAILURE,
          payload: { error: expectedError },
          meta: { userId, addressId: addressId2 },
        },
      ]),
    );
  });

  it('should create the correct actions for when the delete user default billing address procedure is successful', async () => {
    (deleteUserDefaultBillingAddress as jest.Mock).mockResolvedValueOnce({});
    await removeUserDefaultBillingAddress(userId)(
      store.dispatch,
      store.getState as () => StoreState,
    );

    const actionResults = store.getActions();

    expect(deleteUserDefaultBillingAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserDefaultBillingAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_DEFAULT_BILLING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete user default billing address success payload');
  });

  it('should create the correct actions for when there is no default billing address', async () => {
    store = mockStore({
      addresses: INITIAL_STATE,
      entities: {
        addresses: {
          [addressId2]: {
            id: addressId2,
            isCurrentBilling: false,
          },
        },
      },
    });

    const expectedError = new Error(
      'There is no current default billing address',
    );

    (deleteUserDefaultBillingAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removeUserDefaultBillingAddress(userId)(
          store.dispatch,
          store.getState as () => StoreState,
        ),
    ).rejects.toThrow(expectedError);

    expect(deleteUserDefaultBillingAddress).toHaveBeenCalledTimes(0);
    expect(store.getActions()).toMatchObject([]);
  });
});
