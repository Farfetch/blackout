import { actionTypes } from '../..';
import {
  addressId2,
  mockUpdateAddressResponse,
} from 'tests/__fixtures__/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putDefaultContactAddress } from '@farfetch/blackout-client/addresses';
import { setDefaultContactAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  putDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('setDefaultContactAddress() action creator', () => {
  const userId = '12211';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the set contact address procedure fails', async () => {
    const expectedError = new Error('set default contact address error');

    putDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setDefaultContactAddress(userId, addressId2));
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
    putDefaultContactAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(setDefaultContactAddress(userId, addressId2));

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
