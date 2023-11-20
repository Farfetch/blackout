import * as fromAccountSetting from '../../reducer/accountSetting.js';
import * as selectors from '../accountSetting.js';
import {
  mockAccountSetting,
  mockAccountSettingId,
  mockAccountSettingLoadingState,
  mockAccountSettingState,
} from 'tests/__fixtures__/settings/index.mjs';

describe('account setting redux selectors', () => {
  const mockState = mockAccountSettingState;

  beforeEach(jest.clearAllMocks);

  describe('isAccountSettingLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromAccountSetting, 'getIsLoading');

      expect(
        selectors.isAccountSettingLoading(
          mockAccountSettingLoadingState,
          mockAccountSettingId,
        ),
      ).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAccountSettingError()', () => {
    it('should get error', () => {
      const expectedResult =
        mockState.settings.accountSetting.error?.[mockAccountSettingId];
      const spy = jest.spyOn(fromAccountSetting, 'getError');

      expect(
        selectors.getAccountSettingError(mockState, mockAccountSettingId),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isAccountSettingFetched()', () => {
    it('should get the fetched status', () => {
      expect(
        selectors.isAccountSettingFetched(mockState, mockAccountSettingId),
      ).toBe(true);
    });
  });

  describe('getAccountSetting()', () => {
    it('should return the account setting object from the result', () => {
      expect(
        selectors.getAccountSetting(mockState, mockAccountSettingId),
      ).toEqual(mockAccountSetting);
    });
  });
});
