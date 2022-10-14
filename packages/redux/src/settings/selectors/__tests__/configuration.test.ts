import * as fromConfiguration from '../../reducer/configuration';
import * as selectors from '../configuration';
import {
  mockConfiguration,
  mockConfigurationCode,
  mockConfigurationLoadingState,
  mockConfigurationsState,
} from 'tests/__fixtures__/settings';

describe('configuration redux selectors', () => {
  const mockState = mockConfigurationsState;

  beforeEach(jest.clearAllMocks);

  describe('isConfigurationLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromConfiguration, 'getIsLoading');

      expect(
        selectors.isConfigurationLoading(
          mockConfigurationLoadingState,
          mockConfigurationCode,
        ),
      ).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getConfigurationError()', () => {
    it('should get error', () => {
      const expectedResult =
        mockState.settings.configurations.configuration.error[
          mockConfigurationCode
        ];
      const spy = jest.spyOn(fromConfiguration, 'getError');

      expect(
        selectors.getConfigurationError(mockState, mockConfigurationCode),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isConfigurationFetched()', () => {
    it('should get the fetched status', () => {
      expect(
        selectors.isConfigurationFetched(mockState, mockConfigurationCode),
      ).toEqual(true);
    });
  });

  describe('getConfiguration()', () => {
    it('should return the configuration entity for a given id', () => {
      expect(
        selectors.getConfiguration(mockState, mockConfigurationCode),
      ).toEqual(mockConfiguration);
    });
  });
});
