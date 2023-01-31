import {
  addressId2,
  mockUpdateAddressResponse,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doSetDefaultContactAddress from '../doSetDefaultContactAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doSetDefaultContactAddress() action creator', () => {
  const putDefaultContactAddress = jest.fn();
  const userId = '12211';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the set contact address procedure fails', async () => {
    const action = doSetDefaultContactAddress(putDefaultContactAddress);
    const expectedError = new Error('set default contact address error');

    putDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, addressId2));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putDefaultContactAddress).toHaveBeenCalledTimes(1);
      expect(putDefaultContactAddress).toHaveBeenCalledWith(
        userId,
        addressId2,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.SET_DEFAULT_CONTACT_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set contact address procedure is successful', async () => {
    const action = doSetDefaultContactAddress(putDefaultContactAddress);
    putDefaultContactAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(action(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(putDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      addressId2,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('set default contact address success payload');
  });
});
