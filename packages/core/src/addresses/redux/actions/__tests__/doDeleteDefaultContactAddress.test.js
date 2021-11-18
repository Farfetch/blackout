import { addressId2 } from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doDeleteDefaultContactAddress from '../doDeleteDefaultContactAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doDeleteDefaultContactAddress() action creator', () => {
  const deleteDefaultContactAddress = jest.fn();
  const userId = '121212';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the delete default contact address procedure fails', async () => {
    const action = doDeleteDefaultContactAddress(deleteDefaultContactAddress);
    const expectedError = new Error('delete default contact address error');

    deleteDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, addressId2));
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
            type: actionTypes.DELETE_DEFAULT_CONTACT_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.DELETE_DEFAULT_CONTACT_ADDRESS_FAILURE,
            payload: { error: expectedError },
            meta: { userId, addressId: addressId2 },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the delete default contact address procedure is successful', async () => {
    const action = doDeleteDefaultContactAddress(deleteDefaultContactAddress);
    deleteDefaultContactAddress.mockResolvedValueOnce({});
    await store.dispatch(action(userId, addressId2));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(deleteDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(deleteDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.DELETE_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.DELETE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.DELETE_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('delete default contact address success payload');
  });
});
