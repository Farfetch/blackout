import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  expectedGetAddressesNormalizedPayload,
  mockGetAddressesResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { fetchUserAddresses } from '../index.js';
import { find } from 'lodash-es';
import { getUserAddresses } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserAddresses: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store: ReturnType<typeof mockStore>;

describe('fetchUserAddresses() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore({ entities: { user: { id: userId } } });
  });

  it('should create the correct actions for when the get user addresses procedure fails', async () => {
    const expectedError = new Error('get user adresses error');

    (getUserAddresses as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchUserAddresses(userId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserAddresses).toHaveBeenCalledTimes(1);
    expect(getUserAddresses).toHaveBeenCalledWith({ userId }, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_ADDRESSES_REQUEST },
        {
          type: actionTypes.FETCH_USER_ADDRESSES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user address book procedure is successful', async () => {
    (getUserAddresses as jest.Mock).mockResolvedValueOnce(
      mockGetAddressesResponse,
    );
    await fetchUserAddresses(userId)(store.dispatch);

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUserAddresses).toHaveBeenCalledTimes(1);
    expect(getUserAddresses).toHaveBeenCalledWith({ userId }, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_ADDRESSES_REQUEST },
      {
        type: actionTypes.FETCH_USER_ADDRESSES_SUCCESS,
        payload: expectedGetAddressesNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_ADDRESSES_SUCCESS,
      }),
    ).toMatchSnapshot('get user addresses success payload');
  });
});
