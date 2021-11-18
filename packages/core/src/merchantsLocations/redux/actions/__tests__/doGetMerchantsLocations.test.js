import * as actionTypes from '../../actionTypes';
import { doGetMerchantsLocations } from '../';
import {
  mockMerchantLocation,
  mockQuery,
} from 'tests/__fixtures__/merchantsLocations';
import { mockStore } from '../../../../../tests';
import reducer from '../../reducer';

const merchantsLocationsMockStore = (state = {}) =>
  mockStore({ merchantsLocations: reducer() }, state);

describe('doGetMerchantsLocations() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getMerchantsLocations = jest.fn();
  const action = doGetMerchantsLocations(getMerchantsLocations);

  beforeEach(() => {
    jest.clearAllMocks();
    store = merchantsLocationsMockStore();
  });

  it('should create the correct actions for when the get merchants locations procedure fails', async () => {
    const expectedError = new Error('Get merchants locations error');

    getMerchantsLocations.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getMerchantsLocations).toHaveBeenCalledTimes(1);
      expect(getMerchantsLocations).toHaveBeenCalledWith(
        mockQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_MERCHANTS_LOCATIONS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get merchants locations procedure is successful', async () => {
    getMerchantsLocations.mockResolvedValueOnce(mockMerchantLocation);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(getMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getMerchantsLocations).toHaveBeenCalledWith(
      mockQuery,
      expectedConfig,
    );
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST,
          },
          {
            payload: mockMerchantLocation,
            type: actionTypes.GET_MERCHANTS_LOCATIONS_SUCCESS,
          },
        ),
      ]),
    );
  });
});
