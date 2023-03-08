import * as actionTypes from '../../actionTypes.js';
import {
  addressId2,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { deleteUserAddress } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserAddress } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof mockStore>;

describe('removeUserAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the delete user address procedure fails', async () => {
    const expectedError = new Error('delete user address error');

    (deleteUserAddress as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await removeUserAddress(userId, addressId2)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteUserAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { addressId: addressId2 },
          type: actionTypes.REMOVE_USER_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.REMOVE_USER_ADDRESS_FAILURE,
          payload: { error: expectedError },
          meta: { addressId: addressId2 },
        },
      ]),
    );
  });

  it('should create the correct actions for when the delete user address procedure is successful', async () => {
    (deleteUserAddress as jest.Mock).mockResolvedValueOnce(
      mockUpdateAddressResponse,
    );
    await removeUserAddress(userId, addressId2)(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteUserAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_USER_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete user address success payload');
  });
});
