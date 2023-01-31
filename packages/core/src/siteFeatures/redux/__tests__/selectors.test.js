// @TODO: Remove this file in version 2.0.0.
import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import mockState, { siteFeatures } from '../__fixtures__/siteFeatures.fixtures';

describe('siteFeatures redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getSiteFeaturesResult()', () => {
    it('should get the sitefeatures result property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getResult');

      expect(selectors.getSiteFeaturesResult(mockState)).toEqual(siteFeatures);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSiteFeaturesError()', () => {
    it('should get the sitefeatures error property from state', () => {
      const expectedResult = mockState.siteFeatures.error;
      const spy = jest.spyOn(fromReducer, 'getError');

      expect(selectors.getSiteFeaturesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSiteFeaturesIsLoading()', () => {
    it('should get the siteFeatures loading status from state', () => {
      const expectedResult = mockState.siteFeatures.isLoading;
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.getSiteFeaturesIsLoading(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSiteFeaturesIsEnabled()', () => {
    it('should get the siteFeatures loading status from state', () => {
      const spy = jest.spyOn(fromReducer, 'getResult');

      expect(
        selectors.getSiteFeaturesIsEnabled(
          mockState,
          'checkout.payments.shouldUsePaymentGateway',
        ),
      ).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
