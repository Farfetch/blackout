import { utils } from '@farfetch/blackout-analytics';
import UniqueViewIdStorage from '../UniqueViewIdStorage';
import UniqueViewIdStorageOptions from '../UniqueViewIdStorageOptions';

jest.mock('@farfetch/blackout-analytics', () => {
  return {
    ...jest.requireActual('@farfetch/blackout-analytics'),
    utils: {
      logger: {
        warn: jest.fn(),
      },
    },
  };
});

describe('UniqueViewIdStorage Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Should set value', () => {
    const lStorage = new UniqueViewIdStorage(
      UniqueViewIdStorageOptions.default(),
    );

    lStorage.set('Key', 'Value');

    const value = lStorage.get('Key');

    expect(value).toBe('Value');
  });

  it('Should remove oldest item when limit reached', () => {
    const mockConfig = UniqueViewIdStorageOptions.default();
    mockConfig.maxItems = 2;
    const lStorage = new UniqueViewIdStorage(mockConfig);
    // Add a not unique view id value to localStorage
    const mockNotUniqueViewIdKey = 'not_unique_view_id_key';
    const mockDummyValue = 'dummy_value';
    localStorage.setItem(mockNotUniqueViewIdKey, mockDummyValue);

    lStorage.set('Key1', 'Value1');
    lStorage.set('Key2', 'Value2');
    lStorage.set('Key3', 'Value3');

    const value1 = lStorage.get('Key1');
    expect(value1).toBe(null);

    const value2 = lStorage.get('Key2');
    expect(value2).toBe('Value2');

    expect(localStorage.getItem(mockNotUniqueViewIdKey, mockDummyValue));
  });

  it('Should not remove when same item is inserted when limit reached', () => {
    const mockConfig = UniqueViewIdStorageOptions.default();
    mockConfig.maxItems = 1;
    const lStorage = new UniqueViewIdStorage(mockConfig);

    lStorage.set('Key1', 'Value1');
    lStorage.set('Key1', 'Value2');

    const value1 = lStorage.get('Key1');
    expect(value1).toBe('Value2');
  });

  it('Should remove item expired', () => {
    const mockConfig = UniqueViewIdStorageOptions.default();
    mockConfig.expires = -UniqueViewIdStorageOptions.MAX_EXPIRES;
    const lStorage = new UniqueViewIdStorage(mockConfig);

    lStorage.set('Key', 'Value');

    const value = lStorage.get('Key');

    expect(value).toBe(null);
  });

  it('Should expired items when removeExpired called and preserve other localStorage items', () => {
    const mockConfig = UniqueViewIdStorageOptions.default();
    mockConfig.expires = -UniqueViewIdStorageOptions.MAX_EXPIRES;

    let lStorage = new UniqueViewIdStorage(mockConfig);

    // Add an expired unique view id value to localStorage
    lStorage.set('ExpiredKey', 'Value');

    // Add a not expired unique view id value to localStorage
    lStorage.config.expires = UniqueViewIdStorageOptions.MAX_EXPIRES;
    lStorage.set('NotExpiredKey', 'NotExpiredValue');

    // Add a not unique view id value to localStorage
    const mockNotUniqueViewIdKey = 'not_unique_view_id_key';
    const mockDummyValue = 'dummy_value';
    localStorage.setItem(mockNotUniqueViewIdKey, mockDummyValue);

    lStorage.removeExpired();

    const value = lStorage.get('ExpiredKey');

    expect(value).toBe(null);

    expect(localStorage.length).toBe(2);
    expect(localStorage.getItem(mockNotUniqueViewIdKey)).toBe(mockDummyValue);
  });

  it('Should not throw if localStorage is not supported', () => {
    const oldLocalStorage = localStorage;

    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: () => {
          throw new DOMException('Dummy error');
        },
      },
      writable: true,
    });

    expect.assertions(3);

    try {
      let lStorage = new UniqueViewIdStorage(
        UniqueViewIdStorageOptions.default(),
      );

      expect(lStorage.supportsLocalStorage()).toBe(false);

      expect(() => {
        lStorage.removeExpired();

        lStorage.set('x', 'y');

        expect(lStorage.get('x')).toBe(null);
      }).not.toThrow();
    } finally {
      Object.defineProperty(global, 'localStorage', {
        value: oldLocalStorage,
      });
    }
  });

  it("Should not clear items that are not unique view ids when 'clear' method is called", () => {
    const mockNotUniqueViewIdKey = 'not_unique_view_id_key';
    const mockDummyValue = 'dummy_value';

    localStorage.setItem(mockNotUniqueViewIdKey, mockDummyValue);

    const lStorage = new UniqueViewIdStorage(
      UniqueViewIdStorageOptions.default(),
    );

    lStorage.set('Key', 'Value');

    lStorage.clear();

    expect(lStorage.get('Key')).toBe(null);

    expect(localStorage.getItem(mockNotUniqueViewIdKey)).toBe(mockDummyValue);
  });

  it('Should write a warn message if localStorage is supported but setItem fails', () => {
    const oldLocalStorage = localStorage;

    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: () => {
          throw new DOMException('Dummy error');
        },
      },
      writable: true,
    });

    try {
      const lStorage = new UniqueViewIdStorage(
        UniqueViewIdStorageOptions.default(),
      );

      expect(() => lStorage.setItem('Key', 'Value')).not.toThrow();

      expect(utils.logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Unable to store unique view id'),
      );
    } finally {
      Object.defineProperty(global, 'localStorage', {
        value: oldLocalStorage,
      });
    }
  });

  it('removeOldestItem should only remove items that are uniqueViewId values', () => {
    const mockNotUniqueViewIdKey = 'not_unique_view_id_key';
    const mockDummyValue = 'dummy_value';

    localStorage.setItem(mockNotUniqueViewIdKey, mockDummyValue);

    const lStorage = new UniqueViewIdStorage(
      UniqueViewIdStorageOptions.default(),
    );

    lStorage.removeOldestItem();

    expect(localStorage.getItem(mockNotUniqueViewIdKey, mockDummyValue));
  });
});
