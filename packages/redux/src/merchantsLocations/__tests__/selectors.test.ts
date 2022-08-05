import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  mockMerchantLocation,
  mockMerchantLocationId,
  mockMerchantLocationId1,
  mockState,
} from 'tests/__fixtures__/merchantsLocations';

describe('merchants locations redux selectors', () => {
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

  describe('getMerchantLocation()', () => {
    it('should return the merchant location entity', () => {
      expect(
        selectors.getMerchantLocation(mockState, mockMerchantLocationId),
      ).toEqual(mockMerchantLocation);
    });
  });

  describe('getMerchantsLocations()', () => {
    it('should return all the merchantsLocations entities', () => {
      expect(selectors.getMerchantsLocations(mockState)).toEqual(
        mockState.entities.merchantsLocations,
      );
    });
  });

  describe('getMerchantsLocationsByIds()', () => {
    it('should get the merchants locations of the provided array of ids ', () => {
      const ids = [mockMerchantLocationId, mockMerchantLocationId1];

      const result = [
        mockMerchantLocation,
        { ...mockMerchantLocation, id: mockMerchantLocationId1 },
      ];

      expect(selectors.getMerchantsLocationsByIds(mockState, ids)).toEqual(
        result,
      );
    });
  });
});
