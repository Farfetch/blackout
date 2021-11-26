import { dateFormatTokens, getLocaleDateFormat } from '../';

describe('getLocaleDateFormat', () => {
  const toLocaleDateStringMock = jest.fn();
  const yearOption = { include: true, exclude: false };

  beforeAll(() => {
    /**
     * When running the Node within jest, only small-icu intl is imported, making only es-* locales available.
     * Because of that, the `toLocaleDateString()` must be mocked for these unit tests.
     */
    global.Date.prototype.toLocaleDateString = toLocaleDateStringMock;
  });

  beforeEach(jest.clearAllMocks);

  describe('for "en-US" culture code', () => {
    const cultureCode = 'en-US';

    beforeAll(() => {
      toLocaleDateStringMock.mockReturnValue('January 1, 1970');
    });
    it('should return the format "MMMM D YYYY"', () => {
      expect(getLocaleDateFormat(cultureCode, yearOption.include)).toBe(
        dateFormatTokens.dateFormats.MDY,
      );
      expect(toLocaleDateStringMock).toHaveBeenCalledTimes(1);
    });

    it('should return the format "MMMM D"', () => {
      expect(getLocaleDateFormat(cultureCode, yearOption.exclude)).toBe(
        dateFormatTokens.dateFormats.MD,
      );
      expect(toLocaleDateStringMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('for "zh-CN" culture code', () => {
    const cultureCode = 'zh-CN';

    beforeAll(() => {
      toLocaleDateStringMock.mockReturnValue('1970年1月1日');
    });

    it('should return the format "YYYY MMMM D"', () => {
      expect(getLocaleDateFormat(cultureCode, yearOption.include)).toBe(
        dateFormatTokens.dateFormats.YMD,
      );
      expect(toLocaleDateStringMock).toHaveBeenCalledTimes(1);
    });

    it('should return the format "MMMM D"', () => {
      expect(getLocaleDateFormat(cultureCode, yearOption.exclude)).toBe(
        dateFormatTokens.dateFormats.MD,
      );
      expect(toLocaleDateStringMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('for "en-GB" culture code', () => {
    const cultureCode = 'en-GB';

    beforeAll(() => {
      toLocaleDateStringMock.mockReturnValue('1 January 1970');
    });

    it('should return the format "D MMMM YYYY"', () => {
      expect(getLocaleDateFormat(cultureCode, yearOption.include)).toBe(
        dateFormatTokens.dateFormats.DMY,
      );
      expect(toLocaleDateStringMock).toHaveBeenCalledTimes(1);
    });

    it('should return the format "D MMMM"', () => {
      expect(getLocaleDateFormat(cultureCode, yearOption.exclude)).toBe(
        dateFormatTokens.dateFormats.DM,
      );
      expect(toLocaleDateStringMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('for default culture code', () => {
    beforeAll(() => {
      toLocaleDateStringMock.mockReturnValue('January 1, 1970');
    });
    it('should return the default values for "en-US" with year', () => {
      expect(getLocaleDateFormat()).toBe(dateFormatTokens.dateFormats.MDY);
    });
  });
});
