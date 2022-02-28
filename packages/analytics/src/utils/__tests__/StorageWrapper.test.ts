import { PACKAGE_NAME } from '../constants';
import logger from '../logger';
import StorageWrapper from '../StorageWrapper';
import TestStorage from 'test-storage';
import type { Storage } from '../../types/storage.types';

// Mock logger so it does not output to the console
jest.mock('@farfetch/blackout-client/helpers', () => ({
  ...jest.requireActual('@farfetch/blackout-client/helpers'),
  Logger: class {
    warn(message) {
      return message;
    }
    error(message) {
      return message;
    }
  },
}));

logger.error = jest.fn();

describe('Storage', () => {
  let storage: StorageWrapper;
  const testStorage = new TestStorage();
  const getStorageWrapper = (dataStorage?: Storage) =>
    new StorageWrapper(dataStorage);

  beforeEach(async () => {
    storage = await getStorageWrapper(testStorage);
  });

  it('should throw an error if an invalid store is passed', () => {
    expect(() => getStorageWrapper()).toThrow();
  });

  it('Should migrate the old key entry data to `@farfetch/blackout-analytics`', async () => {
    const oldKey = '@farfetch/blackout-core/analytics';
    const data = JSON.stringify({
      consent: {
        marketing: false,
        statistics: false,
        preferences: false,
      },
      localId: 'foo',
    });

    // force the old key to be filled with data directly into the source
    testStorage.setItem(oldKey, data);

    expect(testStorage.items[oldKey]).toEqual(data);

    await storage.createStorage(testStorage);

    expect(testStorage.items[oldKey]).toBeUndefined();
  });

  it('Should create an entry on the storage data with the package name as key', async () => {
    await storage.setItem('foo', 'bar');

    // Despite the `storage.items` being a specific part of our TestStorage
    // we need to validate that it writes the key correctly
    expect(Object.keys(storage.storage.items)[0]).toEqual(PACKAGE_NAME);
  });

  it('Should create a store with 1 year ttl', async () => {
    const currentYear = new Date().getFullYear();
    const ttl = await storage.getItem('ttl');
    const expectedYear = new Date(ttl as number).getFullYear();

    expect(expectedYear).toEqual(currentYear + 1);
  });

  it('Should not update the ttl if its not outdated', () => {
    const ttl = storage.getItem('ttl');

    // Force the createStorage flow with the same store, to ensure the ttl is not updated
    storage.createStorage(testStorage);

    const newTtl = storage.getItem('ttl');

    expect(ttl).toEqual(newTtl);
  });

  it('Should renew the ttl if its outdated', async () => {
    const ttl = await storage.getItem('ttl');

    // Set another property on the store, to make sure that it is deleted if the ttl has expired
    // (and verify if the store only has the property `ttl` after `delete()`)
    await storage.setItem('foo', 'bar');

    // Force the createStorage flow with the same store, to ensure the ttl is not updated
    storage.createStorage(testStorage);

    // Ensure the store is intact
    expect(await storage.getItem()).toMatchObject({
      foo: 'bar',
      ttl,
    });
    const now = new Date();
    const twoYearsFromNow = new Date(now.setFullYear(now.getFullYear() + 2));
    global.Date = class extends Date {
      constructor(data) {
        super(data);
        return twoYearsFromNow;
      }
    };

    // Force the createStorage flow with the same store, to ensure the ttl is updated, as the `new Date()` will return a date two years from now
    await storage.createStorage(testStorage);
    const newTtl = await storage.getItem('ttl');
    const updatedStorage = (await storage.getItem()) as Record<string, unknown>;

    expect(Object.keys(updatedStorage)).toHaveLength(1);
    expect(Object.keys(updatedStorage)[0]).toBe('ttl');
    expect(ttl as number).not.toEqual(newTtl as number);
    expect(ttl as number).toBeLessThan(newTtl as number);
  });

  it('Should return an object with the storage if no key is passed via `getItem()`', async () => {
    const value = 'bar';
    await storage.setItem('foo', value);

    expect(await storage.getItem()).toMatchObject({
      foo: value,
      ttl: expect.any(Number), // At this point this is already tested, no need to check ttl again
    });
  });

  it('Should return a value if passed a key', async () => {
    const value = 'bar';
    await storage.setItem('foo', value);

    expect(await storage.getItem('foo')).toEqual(value);
  });

  it('Should return the instance via `set()` if no key is passed', async () => {
    const wrapper = await storage.setItem();
    expect(wrapper).toEqual(storage);
  });

  it('Should set and merge a property with the data already stored', async () => {
    const data = {
      foo: 'foo',
    };

    await storage.setItem('data', data);

    expect(await storage.getItem('data')).toEqual(data);

    await storage.setItem('data', { ...data, bar: 'bar' });

    expect(await storage.getItem('data')).toEqual({
      foo: 'foo',
      bar: 'bar',
    });
  });

  it('Should remove an item from the storage', async () => {
    await storage.setItem('foo', 'bar');

    expect(await storage.getItem('foo')).toEqual('bar');

    await storage.removeItem('foo');

    expect(await storage.getItem('foo')).toBeUndefined();
  });

  describe('Should call the methods of the passed storage', () => {
    it('should call getItem()', async () => {
      const testStorageGetItemSpy = jest.spyOn(testStorage, 'getItem');

      testStorageGetItemSpy.mockClear(); // remove the calls made from createStorage()

      await storage.getItem();
      expect(testStorageGetItemSpy).toBeCalledTimes(1);
    });

    it('should call setItem()', async () => {
      const testStorageSetItemSpy = jest.spyOn(testStorage, 'setItem');

      testStorageSetItemSpy.mockClear(); // remove the calls made from createStorage()

      await storage.setItem('foo', 'bar');
      expect(testStorageSetItemSpy).toBeCalledTimes(1);
    });

    it('should call removeItem() when calling clear()', async () => {
      const testStorageRemoveItemSpy = jest.spyOn(testStorage, 'removeItem');

      testStorageRemoveItemSpy.mockClear(); // remove the calls made from createStorage()

      await storage.clear();
      expect(testStorageRemoveItemSpy).toBeCalledTimes(1);
    });
  });
});
