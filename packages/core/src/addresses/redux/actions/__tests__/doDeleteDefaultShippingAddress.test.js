import { addressId2 } from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doDeleteDefaultShippingAddress from '../doDeleteDefaultShippingAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore(
    {
      addresses: reducer(),
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
let store;

describe('doDeleteDefaultShippingAddress() action creator', () => {
  const deleteDefaultShippingAddress = jest.fn();
  const userId = '121212';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the delete default shipping address procedure fails', async () => {
    const action = doDeleteDefaultShippingAddress(deleteDefaultShippingAddress);
    const expectedError = new Error('delete default shipping address error');

    deleteDefaultShippingAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, expectedConfig));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteDefaultShippingAddress).toHaveBeenCalledTimes(1);
      expect(deleteDefaultShippingAddress).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { userId, addressId: addressId2 },
            type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { userId, addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete default shipping address procedure is successful', async () => {
    const action = doDeleteDefaultShippingAddress(deleteDefaultShippingAddress);
    deleteDefaultShippingAddress.mockResolvedValueOnce({});
    await store.dispatch(action(userId, expectedConfig));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(deleteDefaultShippingAddress).toHaveBeenCalledTimes(1);
    expect(deleteDefaultShippingAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete default shipping address success payload');
  });
});
