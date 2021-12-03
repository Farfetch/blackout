import { actionTypes } from '../..';
import { addressId2 } from 'tests/__fixtures__/addresses';
import { deleteDefaultContactAddress } from '@farfetch/blackout-client/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { removeDefaultContactAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  deleteDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('removeDefaultContactAddress() action creator', () => {
  const userId = '121212';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the delete default contact address procedure fails', async () => {
    const expectedError = new Error('delete default contact address error');

    deleteDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(removeDefaultContactAddress(userId, addressId2));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(deleteDefaultContactAddress).toHaveBeenCalledTimes(1);
      expect(deleteDefaultContactAddress).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { userId, addressId: addressId2 },
            type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { userId, addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete default contact address procedure is successful', async () => {
    deleteDefaultContactAddress.mockResolvedValueOnce({});
    await store.dispatch(removeDefaultContactAddress(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(deleteDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(deleteDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete default contact address success payload');
  });
});
