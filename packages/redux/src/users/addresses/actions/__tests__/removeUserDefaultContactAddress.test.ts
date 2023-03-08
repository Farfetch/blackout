import * as actionTypes from '../../actionTypes.js';
import { addressId2, userId } from 'tests/__fixtures__/users/index.mjs';
import { deleteUserDefaultContactAddress } from '@farfetch/blackout-client';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { removeUserDefaultContactAddress } from '../index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteUserDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('removeUserDefaultContactAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the delete user default contact address procedure fails', async () => {
    const expectedError = new Error(
      'delete user default contact address error',
    );

    (deleteUserDefaultContactAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () =>
        await removeUserDefaultContactAddress(
          userId,
          addressId2,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(deleteUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { userId, addressId: addressId2 },
          type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
          payload: { error: expectedError },
          meta: { userId, addressId: addressId2 },
        },
      ]),
    );
  });

  it('should create the correct actions for when the delete user default contact address procedure is successful', async () => {
    (deleteUserDefaultContactAddress as jest.Mock).mockResolvedValueOnce({});
    await removeUserDefaultContactAddress(userId, addressId2)(store.dispatch);

    const actionResults = store.getActions();

    expect(deleteUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(deleteUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete user default contact address success payload');
  });
});
