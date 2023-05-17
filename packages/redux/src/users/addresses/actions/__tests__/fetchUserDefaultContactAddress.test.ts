import * as actionTypes from '../../actionTypes.js';
import { fetchUserDefaultContactAddress } from '../index.js';
import { find } from 'lodash-es';
import { getUserDefaultContactAddress } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockGetAddressResponse } from 'tests/__fixtures__/users/index.mjs';
import { mockStore } from '../../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof addressesMockStore>;

describe('fetchUserDefaultContactAddress() action creator', () => {
  const userId = 123456;

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get user default contact address details procedure fails', async () => {
    const expectedError = new Error('get user default contact address error');

    (getUserDefaultContactAddress as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );

    await expect(
      async () => await fetchUserDefaultContactAddress(userId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(getUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
        },
        {
          type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user address details procedure is successful', async () => {
    const expectedResponse = { ...mockGetAddressResponse };

    (getUserDefaultContactAddress as jest.Mock).mockResolvedValueOnce(
      mockGetAddressResponse,
    );
    await fetchUserDefaultContactAddress(userId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(getUserDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
        payload: expectedResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get user default contact address success payload');
  });
});
