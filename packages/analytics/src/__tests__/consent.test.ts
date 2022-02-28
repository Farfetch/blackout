import { StorageWrapper } from '../utils';
import Consent from '../Consent';
import TestStorage from 'test-storage';
import type ConsentData from '../types/consentData.types';

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

  it('Should return default consent if there is no consent stored yet', async () => {
    expect(await consentInstance.get()).toMatchObject({
      marketing: false,
      preferences: false,
      statistics: false,
    });
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

    await consentInstance.set();

    consentInStorage = await storage.getItem('consent');

    expect(consentInStorage).toMatchObject(data);
  });

  it('Should only set valid consent parameters on storage', async () => {
    const invalidData = {
      foo: true,
    } as unknown as ConsentData;

    const inputConsentData = {
      marketing: false,
      statistics: true,
    };

    const outputConsentData = {
      ...inputConsentData,
      preferences: false,
    };

    await consentInstance.set(invalidData);

    const consentInStorage = await storage.getItem('consent');

    expect(consentInStorage).not.toHaveProperty('foo');

    await consentInstance.set(inputConsentData);

    const newConsentInStorage = await storage.getItem('consent');

    expect(newConsentInStorage).toMatchObject(outputConsentData);
  });

  it('Should throw if an invalid storage instance is passed to the constructor', () => {
    const invalidData = undefined as unknown as StorageWrapper;
    expect(() => new Consent(invalidData)).toThrow();
  });
});
