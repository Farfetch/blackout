import * as actionTypes from '../../actionTypes.js';
import { addressId2, userId } from 'tests/__fixtures__/users/index.mjs';
import { deleteUserDefaultShippingAddress } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserDefaultShippingAddress } from '../index.js';
import type { StoreState } from '../../../../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserDefaultShippingAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore(
    {
      addresses: INITIAL_STATE,
      entities: {
        addresses: {
          [addressId2]: {
            id: addressId2,
            isCurrentShipping: true,
          },
        },
      },
    },
    state,
  );

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('removeUserDefaultShippingAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the delete user default shipping address procedure fails', async () => {
    const expectedError = new Error(
      'delete user default shipping address error',
    );

    (deleteUserDefaultShippingAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removeUserDefaultShippingAddress(userId)(
          store.dispatch,
          store.getState as () => StoreState,
        ),
    ).rejects.toThrow(expectedError);

    expect(deleteUserDefaultShippingAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserDefaultShippingAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { userId, addressId: addressId2 },
          type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE,
          payload: { error: expectedError },
          meta: { userId, addressId: addressId2 },
        },
      ]),
    );
  });

  it('should create the correct actions for when the delete user default shipping address procedure is successful', async () => {
    (deleteUserDefaultShippingAddress as jest.Mock).mockResolvedValueOnce({});
    await removeUserDefaultShippingAddress(userId)(
      store.dispatch,
      store.getState as () => StoreState,
    );

    const actionResults = store.getActions();

    expect(deleteUserDefaultShippingAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserDefaultShippingAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete user default shipping address success payload');
  });

  it('should create the correct actions for when there is no default shipping address', async () => {
    store = mockStore({
      addresses: INITIAL_STATE,
      entities: {
        addresses: {
          [addressId2]: {
            id: addressId2,
            isCurrentShipping: false,
          },
        },
      },
    });

    const expectedError = new Error(
      'There is no current default shipping address',
    );

    (deleteUserDefaultShippingAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removeUserDefaultShippingAddress(userId)(
          store.dispatch,
          store.getState as () => StoreState,
        ),
    ).rejects.toThrow(expectedError);

    expect(deleteUserDefaultShippingAddress).toHaveBeenCalledTimes(0);
    expect(store.getActions()).toMatchObject([]);
  });
});
