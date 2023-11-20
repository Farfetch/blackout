import * as fromAccountSettings from '../../reducer/accountSettings.js';
import * as selectors from '../accountSettings.js';
import {
  mockAccountSettings,
  mockAccountSettingsLoadingState,
  mockAccountSettingsState,
  mockQuery,
  mockQueryHashed,
} from 'tests/__fixtures__/settings/index.mjs';

describe('account settings redux selectors', () => {
  const mockState = mockAccountSettingsState;

  beforeEach(jest.clearAllMocks);

  describe('areAccountSettingsLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromAccountSettings, 'getIsLoading');

      expect(
        selectors.areAccountSettingsLoading(
          mockAccountSettingsLoadingState,
          mockQuery,
        ),
      ).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAccountSettingsError()', () => {
    it('should get error', () => {
      const expectedResult =
        mockState.settings.accountSetting.error?.[mockQueryHashed];
      const spy = jest.spyOn(fromAccountSettings, 'getError');

      expect(selectors.getAccountSettingsError(mockState, mockQuery)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areAccountSettingsFetched()', () => {
    it('should get the fetched status', () => {
      expect(selectors.areAccountSettingsFetched(mockState, mockQuery)).toBe(
        true,
      );
    });
  });

  describe('getAccountSettings()', () => {
    it('should return the configuration entity for a given id', () => {
      expect(selectors.getAccountSettings(mockState, mockQuery)).toEqual(
        mockAccountSettings,
      );
    });
  });
});
