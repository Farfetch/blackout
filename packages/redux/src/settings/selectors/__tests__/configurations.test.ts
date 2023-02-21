import * as fromConfigurations from '../../reducer/configurations';
import * as selectors from '../configurations';
import {
  mockConfigurationsLoadingState,
  mockConfigurationsState,
} from 'tests/__fixtures__/settings';

describe('configurations redux selectors', () => {
  const mockState = mockConfigurationsState;

  beforeEach(jest.clearAllMocks);

  describe('areConfigurationsLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromConfigurations, 'getIsLoading');

      expect(
        selectors.areConfigurationsLoading(mockConfigurationsLoadingState),
      ).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getConfigurationsError()', () => {
    it('should get error', () => {
      const expectedResult = mockState.settings.configurations.error;
      const spy = jest.spyOn(fromConfigurations, 'getError');

      expect(selectors.getConfigurationsError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areConfigurationsFetched()', () => {
    it('should get the fetched status', () => {
      expect(selectors.areConfigurationsFetched(mockState)).toBe(true);
    });
  });

  describe('getConfigurations()', () => {
    it('should return the configurations entity', () => {
      expect(selectors.getConfigurations(mockState)).toEqual(
        mockState.entities.configurations,
      );
    });
  });
});
