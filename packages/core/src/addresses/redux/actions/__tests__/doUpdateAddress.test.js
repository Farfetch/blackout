import {
  addressId2,
  expectedUpdateAddressNormalizedPayload,
  mockUpdateAddressResponse,
  userId,
} from '../../__fixtures__/addresses.fixtures';
import { mockStore } from '../../../../../tests';
import doUpdateAddress from '../doUpdateAddress';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doUpdateAddress() action creator', () => {
  const putAddress = jest.fn();
  const data = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the update address procedure fails', async () => {
    const action = doUpdateAddress(putAddress);
    const expectedError = new Error('update address error');

    putAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(addressId2, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putAddress).toHaveBeenCalledTimes(1);
      expect(putAddress).toHaveBeenCalledWith(
        { userId, id: addressId2 },
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: { addressId: addressId2 },
            type: actionTypes.UPDATE_ADDRESS_REQUEST,
          },
          {
            meta: { addressId: addressId2 },
            type: actionTypes.UPDATE_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update address procedure is successful', async () => {
    const action = doUpdateAddress(putAddress);

    putAddress.mockResolvedValueOnce(mockUpdateAddressResponse);
    await store.dispatch(action(addressId2, data));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(putAddress).toHaveBeenCalledTimes(1);
    expect(putAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.UPDATE_ADDRESS_SUCCESS,
        payload: expectedUpdateAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('update address success payload');
  });
});
