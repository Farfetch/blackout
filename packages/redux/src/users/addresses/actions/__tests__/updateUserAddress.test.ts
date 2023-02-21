import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  addressId2,
  address4 as data,
  expectedUpdateAddressNormalizedPayload,
  mockUpdateAddressResponse,
  userId,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { putUserAddress } from '@farfetch/blackout-client';
import { updateUserAddress } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('updateUserAddress() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the update user address procedure fails', async () => {
    const expectedError = new Error('update user address error');

    (putUserAddress as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateUserAddress(userId, addressId2, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(putUserAddress).toHaveBeenCalledTimes(1);
    expect(putUserAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          meta: { addressId: addressId2 },
          type: actionTypes.UPDATE_USER_ADDRESS_REQUEST,
        },
        {
          meta: { addressId: addressId2 },
          type: actionTypes.UPDATE_USER_ADDRESS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the update user address procedure is successful', async () => {
    (putUserAddress as jest.Mock).mockResolvedValueOnce(
      mockUpdateAddressResponse,
    );
    await updateUserAddress(userId, addressId2, data)(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(putUserAddress).toHaveBeenCalledTimes(1);
    expect(putUserAddress).toHaveBeenCalledWith(
      { userId, id: addressId2 },
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_USER_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
        payload: expectedUpdateAddressNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('update user address success payload');
  });
});
