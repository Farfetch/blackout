import { StorageWrapper } from '../utils/index.js';
import Consent from '../Consent.js';
import TestStorage from 'test-storage';

describe('Consent', () => {
  let storage: StorageWrapper;
  let consentInstance: Consent;

  beforeEach(() => {
    storage = new StorageWrapper(new TestStorage());
    consentInstance = new Consent(storage);
  });

  it('Should set consent object', async () => {
    const data = {
      marketing: false,
      statistics: true,
      preferences: false,
    };

    await consentInstance.set(data);

    const consentInStorage = await storage.getItem('consent');

    expect(consentInStorage).toMatchObject(data);
  });

  it('Should return null if no consent is set', async () => {
    expect(await consentInstance.get()).toBeNull();
  });

  it('Should return the consent data via get()', async () => {
    const data = { marketing: true };

    await consentInstance.set(data);

    const consentedData = await consentInstance.get();

    expect(consentedData).toMatchObject(data);
  });

  it('Should keep values if call `set()` without parameters', async () => {
    let consentInStorage;
    const data = {
      marketing: true,
      statistics: false,
      preferences: false,
    };

    await consentInstance.set(data);
    consentInStorage = await storage.getItem('consent');

    expect(consentInStorage).toMatchObject(data);

    // @ts-expect-error
    await consentInstance.set();

    consentInStorage = await storage.getItem('consent');

    expect(consentInStorage).toMatchObject(data);
  });

  it('Should throw if an invalid storage instance is passed to the constructor', () => {
    const invalidData = undefined;

    // @ts-expect-error
    expect(() => new Consent(invalidData)).toThrow();
  });
});
