import { StorageWrapper } from '../utils';
import TestStorage from 'test-storage';
import User from '../User';

describe('User', () => {
  let userInstance: User;
  let storage: StorageWrapper;

  beforeEach(async () => {
    storage = await new StorageWrapper(new TestStorage());
    userInstance = new User(storage);
  });

  it('Should return the user data', async () => {
    const localId = await userInstance.localId();

    expect(await userInstance.get()).toMatchObject({
      id: null,
      traits: {},
      localId,
    });
  });

  it('Should not identify a user without parameters', async () => {
    await userInstance.set();

    expect(userInstance.data.id).toEqual(null);
    expect(userInstance.data.traits).toMatchObject({});
  });

  it('Should delete the user', async () => {
    await userInstance.set('123123', { name: 'foo' });
    const beforeAnonymizeLocalId = await userInstance.localId();

    await userInstance.anonymize();

    const afterAnonymizeLocalId = await userInstance.localId();

    expect(userInstance.data).toMatchObject({ id: null, traits: {} });
    expect(beforeAnonymizeLocalId === afterAnonymizeLocalId).toBe(true);
  });

  it('Should identify an user with parameters', async () => {
    const userId = '12345678';
    const traits = {
      name: 'Foo',
      email: 'foo.bar@foo.bar',
    };

    await userInstance.set(userId, traits);

    expect(userInstance.data.id).toMatch(userId);
    expect(userInstance.data.traits).toMatchObject(traits);
  });

  it('Should create a local ID and store it on the storage', async () => {
    const setItemMock = jest.spyOn(storage, 'setItem');

    storage.clear();

    const localId = await userInstance.localId();

    expect(typeof localId).toEqual('string');

    expect(setItemMock).toBeCalledWith('localId', localId);
  });

  it('Should return a local ID if already in storage', async () => {
    // Force creation and storage of a new localId
    await userInstance.localId();

    const localIdInStorage = await storage.getItem('localId');
    const localId = await userInstance.localId();

    expect(localId).toEqual(localIdInStorage);
  });

  it('Should call localId when set() is executed', () => {
    const localIdSpy = jest.spyOn(userInstance, 'localId');

    userInstance.set();

    expect(localIdSpy).toBeCalled();
  });

  it('Should throw if an invalid storage instance is passed to the constructor', () => {
    const invalidData = undefined as unknown as StorageWrapper;
    expect(() => new User(invalidData)).toThrow();
  });
});
