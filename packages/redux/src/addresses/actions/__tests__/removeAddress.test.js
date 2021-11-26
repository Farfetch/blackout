import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/addresses';
import { deleteAddress } from '@farfetch/blackout-client/addresses';
import { mockStore } from '../../../../tests';
import { removeAddress } from '..';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  deleteAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('removeAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the delete address procedure fails', async () => {
    const expectedError = new Error('delete address error');

    deleteAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removeAddress(userId, addressId2));
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
            type: actionTypes.REMOVE_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.REMOVE_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete address procedure is successful', async () => {
    deleteAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(removeAddress(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(deleteAddress).toHaveBeenCalledTimes(1);
    expect(deleteAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.REMOVE_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete address success payload');
  });
});
