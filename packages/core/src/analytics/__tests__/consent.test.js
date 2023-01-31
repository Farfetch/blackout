import { StorageWrapper } from '../utils';
import { TestStorage } from '../../../tests/helpers';
import Consent from '../Consent';

describe('Consent', () => {
  let storage;
  let consentInstance;

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

  it('Should return null if there is no consent stored yet', async () => {
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

    await consentInstance.set();

    consentInStorage = await storage.getItem('consent');

    expect(consentInStorage).toMatchObject(data);
  });

  it('Should throw if an invalid storage instance is passed to the constructor', () => {
    expect(() => new Consent()).toThrow();
  });
});
