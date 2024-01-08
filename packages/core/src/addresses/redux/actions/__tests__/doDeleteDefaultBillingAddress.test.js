import { addressId2 } from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doDeleteDefaultBillingAddress from '../doDeleteDefaultBillingAddress';
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
            isCurrentBilling: true,
          },
        },
      },
    },
    state,
  );

const expectedConfig = undefined;
let store;

describe('doDeleteDefaultBillingAddress() action creator', () => {
  const deleteDefaultBillingAddress = jest.fn();
  const userId = '121212';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the delete default billing address procedure fails', async () => {
    const action = doDeleteDefaultBillingAddress(deleteDefaultBillingAddress);
    const expectedError = new Error(
      'There is no current default billing address',
    );
    deleteDefaultBillingAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, expectedConfig));
    } catch (error) {
      expect(error).toStrictEqual(expectedError);
      expect(deleteDefaultBillingAddress).toHaveBeenCalledTimes(1);
      expect(deleteDefaultBillingAddress).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { userId, addressId: addressId2 },
            type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { userId, addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete default billing address procedure is successful', async () => {
    const action = doDeleteDefaultBillingAddress(deleteDefaultBillingAddress);
    deleteDefaultBillingAddress.mockResolvedValueOnce({});
    await store.dispatch(action(userId, expectedConfig));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(deleteDefaultBillingAddress).toHaveBeenCalledTimes(1);
    expect(deleteDefaultBillingAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_DEFAULT_BILLING_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete default billing address success payload');
  });
});
