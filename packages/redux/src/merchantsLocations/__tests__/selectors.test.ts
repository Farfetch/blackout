import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import { mockState } from 'tests/__fixtures__/merchantsLocations';

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
});
