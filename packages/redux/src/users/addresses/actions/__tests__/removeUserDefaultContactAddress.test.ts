import * as actionTypes from '../../actionTypes';
import { addressId2, userId } from 'tests/__fixtures__/users';
import { deleteUserDefaultContactAddress } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { removeUserDefaultContactAddress } from '..';
import find from 'lodash/find';

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
    expect.assertions(4);

    await removeUserDefaultContactAddress(
      userId,
      addressId2,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
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
  });

  it('should create the correct actions for when the delete user default contact address procedure is successful', async () => {
    (deleteUserDefaultContactAddress as jest.Mock).mockResolvedValueOnce({});
    await removeUserDefaultContactAddress(userId, addressId2)(store.dispatch);

    const actionResults = store.getActions();

    expect.assertions(4);
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
