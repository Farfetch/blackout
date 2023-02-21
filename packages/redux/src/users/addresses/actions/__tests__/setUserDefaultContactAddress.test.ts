import * as actionTypes from '../../actionTypes';
import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { putUserDefaultContactAddress } from '@farfetch/blackout-client';
import { setUserDefaultContactAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('setUserDefaultContactAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the set user default contact address procedure fails', async () => {
    const expectedError = new Error('set user default contact address error');

    (putUserDefaultContactAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await setUserDefaultContactAddress(userId, addressId2)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(putUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(putUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      addressId2,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { addressId: addressId2 },
          type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
          payload: { error: expectedError },
          meta: { addressId: addressId2 },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set user default contact address procedure is successful', async () => {
    (putUserDefaultContactAddress as jest.Mock).mockResolvedValueOnce(
      mockUpdateAddressResponse,
    );
    await setUserDefaultContactAddress(userId, addressId2)(store.dispatch);

    const actionResults = store.getActions();

    expect(putUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(putUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      addressId2,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('set user default contact address success payload');
  });
});
