import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  mockMerchantLocation,
  mockMerchantLocationId,
} from 'tests/__fixtures__/merchantsLocations';

describe('merchants locations redux selectors', () => {
  const mockMerchantLocationId_1 = '1';
  const mockMerchantLocationId_2 = '2';
  const mockState = {
    merchantsLocations: {
      error: 'Error',
      isLoading: false,
    },
    entities: {
      merchantsLocations: {
        [mockMerchantLocationId]: mockMerchantLocation,
        [mockMerchantLocationId_1]: mockMerchantLocation,
        [mockMerchantLocationId_2]: mockMerchantLocation,
      },
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('areMerchantsLocationsLoading()', () => {
    it('should get the loading status of the merchants locations', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.areMerchantsLocationsLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMerchantsLocationsError()', () => {
    it('should get the merchants locations error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.merchantsLocations.error;

      expect(selectors.getMerchantsLocationsError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllMerchantsLocations()', () => {
    it('should get the all the merchants locations fetched on state', () => {
      expect(selectors.getAllMerchantsLocations(mockState)).toEqual([
        mockMerchantLocation,
        mockMerchantLocation,
        mockMerchantLocation,
      ]);
    });

    it('should return an empty array since there are no MerchantsLocations', () => {
      const mockState = {
        entities: {},
      };

      expect(selectors.getAllMerchantsLocations(mockState)).toEqual([]);
    });
  });

  describe('getMerchantLocation()', () => {
    it('should get the merchant location of the provided id', () => {
      expect(
        selectors.getMerchantLocation(mockState, mockMerchantLocationId),
      ).toEqual(mockMerchantLocation);
    });
  });

  describe('getMerchantsLocations()', () => {
    it('should get the merchants locations of the provided array of ids ', () => {
      const ids = [mockMerchantLocationId, mockMerchantLocationId_1];
      const result = [mockMerchantLocation, mockMerchantLocation];

      expect(selectors.getMerchantsLocations(mockState, ids)).toEqual(result);
    });
  });
});
