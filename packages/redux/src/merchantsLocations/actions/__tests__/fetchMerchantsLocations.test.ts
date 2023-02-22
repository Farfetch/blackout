import * as actionTypes from '../../actionTypes';
import { fetchMerchantsLocations } from '..';
import { getMerchantsLocations } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockMerchantLocation,
  mockMerchantsLocationsNormalizedResponse,
  mockQuery,
} from 'tests/__fixtures__/merchantsLocations';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getMerchantsLocations: jest.fn(),
}));

const merchantsLocationsMockStore = (state = {}) =>
  mockStore({ merchantsLocations: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store: ReturnType<typeof merchantsLocationsMockStore>;

describe('fetchMerchantsLocations() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = merchantsLocationsMockStore();
  });

  it('should create the correct actions for when the fetch merchants locations procedure fails', async () => {
    const expectedError = new Error('Fetch merchants locations error');

    (getMerchantsLocations as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchMerchantsLocations(mockQuery)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getMerchantsLocations).toHaveBeenCalledWith(
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        payload: { error: expectedError },
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch merchants locations procedure is successful', async () => {
    (getMerchantsLocations as jest.Mock).mockResolvedValueOnce([
      mockMerchantLocation,
    ]);

    await fetchMerchantsLocations(mockQuery)(store.dispatch).then(
      clientResult => {
        expect(clientResult).toEqual([mockMerchantLocation]);
      },
    );

    expect(getMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getMerchantsLocations).toHaveBeenCalledWith(
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        payload: mockMerchantsLocationsNormalizedResponse,
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS,
      },
    ]);
  });
});
