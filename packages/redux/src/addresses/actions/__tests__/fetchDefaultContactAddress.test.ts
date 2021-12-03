import { actionTypes } from '../..';
import { fetchDefaultContactAddress } from '..';
import { getDefaultContactAddress } from '@farfetch/blackout-client/addresses';
import { INITIAL_STATE } from '../../reducer';
import { mockGetAddressResponse } from 'tests/__fixtures__/addresses';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-client/addresses'),
  getDefaultContactAddress: jest.fn(),
}));

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store;

describe('fetchDefaultContactAddress() action creator', () => {
  const userId = '121212';

  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct actions for when the get default contact address details procedure fails', async () => {
    const expectedError = new Error('get default contact address error');

    getDefaultContactAddress.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchDefaultContactAddress(userId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getDefaultContactAddress).toHaveBeenCalledTimes(1);
      expect(getDefaultContactAddress).toHaveBeenCalledWith(
        userId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
          },
          {
            type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get address details procedure is successful', async () => {
    const expectedResponse = { ...mockGetAddressResponse };

    getDefaultContactAddress.mockResolvedValueOnce(mockGetAddressResponse);
    await store.dispatch(fetchDefaultContactAddress(userId));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getDefaultContactAddress).toHaveBeenCalledTimes(1);
    expect(getDefaultContactAddress).toHaveBeenCalledWith(
      userId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_REQUEST,
      },
      {
        type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
        payload: expectedResponse,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_DEFAULT_CONTACT_ADDRESS_SUCCESS,
      }),
    ).toMatchSnapshot('get default contact address success payload');
  });
});
