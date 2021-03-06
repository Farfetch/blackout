import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doDeleteAddress from '../doDeleteAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doDeleteAddress() action creator', () => {
  const deleteAddress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the delete address procedure fails', async () => {
    const action = doDeleteAddress(deleteAddress);
    const expectedError = new Error('delete address error');

    deleteAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(addressId2));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteAddress).toHaveBeenCalledTimes(1);
      expect(deleteAddress).toHaveBeenCalledWith(
        { userId, id: addressId2 },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.DELETE_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.DELETE_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete address procedure is successful', async () => {
    const action = doDeleteAddress(deleteAddress);
    deleteAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(action(addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(deleteAddress).toHaveBeenCalledTimes(1);
    expect(deleteAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.DELETE_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.DELETE_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete address success payload');
  });
});
